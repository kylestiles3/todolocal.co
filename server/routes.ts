import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertEventSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.events.list.path, async (req, res) => {
    const filter = req.query.filter as 'all' | 'week' | 'weekend' | 'free' | undefined;
    const search = req.query.search as string | undefined;
    const events = await storage.getEvents(filter, search);
    res.json(events);
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  });

  app.post(api.events.create.path, async (req, res) => {
    try {
      const input = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getEvents();
  if (existing.length === 0) {
    const now = new Date();
    
    // Helper to get date relative to now
    const addDays = (days: number) => {
      const d = new Date(now);
      d.setDate(now.getDate() + days);
      return d;
    };

    // This week event
    await storage.createEvent({
      title: "Downtown Farmers Market",
      description: "Fresh produce, local honey, and artisan crafts at the pavilion. Come support local farmers!",
      startTime: addDays(2), // 2 days from now
      location: "Tandy Centennial Park",
      category: "food",
      isFree: true,
      imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
      sourceUrl: "#"
    });

    // Weekend event
    await storage.createEvent({
      title: "Jazz in the Park",
      description: "An evening of smooth jazz under the stars. Bring a blanket and enjoy the music.",
      startTime: addDays(5), // likely weekend or close
      location: "Woodland Park",
      category: "music",
      isFree: true,
      imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80",
      sourceUrl: "#"
    });

    // Workshop
    await storage.createEvent({
      title: "React & Coffee Workshop",
      description: "Learn the basics of React while enjoying local brew. Beginners welcome!",
      startTime: addDays(3),
      location: "North Lime Coffee & Donuts",
      category: "workshop",
      isFree: false,
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
      sourceUrl: "#"
    });

     // Next week / future
    await storage.createEvent({
      title: "Night Market",
      description: "Food trucks, vendors, and live music taking over the streets.",
      startTime: addDays(10),
      location: "North Limestone",
      category: "community",
      isFree: true,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
      sourceUrl: "#"
    });
  }
}
