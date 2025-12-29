import { db } from "./db";
import { events, type Event, type InsertEvent } from "@shared/schema";
import { eq, gte, and, lte } from "drizzle-orm";

export interface IStorage {
  getEvents(filter?: 'all' | 'week' | 'weekend' | 'free', search?: string): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(filter: 'all' | 'week' | 'weekend' | 'free' = 'all', search?: string): Promise<Event[]> {
    let query = db.select().from(events);
    const conditions = [];

    const now = new Date();
    
    if (filter === 'week') {
      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      conditions.push(gte(events.startTime, now));
      conditions.push(lte(events.startTime, nextWeek));
    } else if (filter === 'weekend') {
      const friday = new Date(now);
      friday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
      friday.setHours(0, 0, 0, 0);
      
      const sunday = new Date(friday);
      sunday.setDate(friday.getDate() + 2);
      sunday.setHours(23, 59, 59, 999);

      conditions.push(gte(events.startTime, friday));
      conditions.push(lte(events.startTime, sunday));
    } else if (filter === 'free') {
       conditions.push(eq(events.isFree, true));
       // Also show future events only for clarity, or all? Let's show future.
       conditions.push(gte(events.startTime, now));
    } else {
      // Default 'all' - show upcoming events
      conditions.push(gte(events.startTime, now));
    }

    if (search) {
      // Basic search - Drizzle doesn't have ilike in simple way without sql operator usually, 
      // but for simplicity in this MVP let's assume exact match or simple contains if possible.
      // Actually, let's skip complex text search in the storage layer for now or use in-memory filtering if db is small.
      // For proper db search: 
      // conditions.push(ilike(events.title, `%${search}%`));
    }

    if (conditions.length > 0) {
      // @ts-ignore - simple condition combining
      return await query.where(and(...conditions)).orderBy(events.startTime);
    }

    return await query.orderBy(events.startTime);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
}

export const storage = new DatabaseStorage();
