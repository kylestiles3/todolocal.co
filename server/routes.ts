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

    const sampleEvents = [
      {
        title: "Downtown Farmers Market",
        description: "Fresh produce, local honey, and artisan crafts at the pavilion. Come support local farmers! Every Saturday morning with live acoustic music.",
        startTime: addDays(2),
        location: "Tandy Centennial Park",
        category: "food",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
        sourceUrl: "https://www.lfmky.com/"
      },
      {
        title: "Jazz in the Park",
        description: "An evening of smooth jazz under the stars. Bring a blanket and enjoy the music. Food and drinks available for purchase.",
        startTime: addDays(5),
        location: "Woodland Park",
        category: "music",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "React & Coffee Workshop",
        description: "Learn the basics of React while enjoying local brew. Beginners welcome! Covers components, hooks, and state management. Coffee and pastries included.",
        startTime: addDays(3),
        location: "North Lime Coffee & Donuts",
        category: "workshop",
        isFree: false,
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "Night Market",
        description: "Food trucks, vendors, and live music taking over the streets. Shop from local artisans, enjoy food from around the world, and dance to live performances.",
        startTime: addDays(10),
        location: "North Limestone",
        category: "food",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "Community Cleanup Day",
        description: "Join your neighbors in beautifying our community! We'll clean parks, plant trees, and make Lexington greener. All ages welcome.",
        startTime: addDays(7),
        location: "Shriners Park",
        category: "community",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "Open Mic Night at Blue Door Bakery",
        description: "Showcase your talent or just enjoy the performances. Sign-ups start at 7 PM. All genres welcome!",
        startTime: addDays(6),
        location: "Blue Door Bakery",
        category: "music",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "Yoga in the Park",
        description: "Join us for an outdoor yoga session led by certified instructors. Bring your own mat. Suitable for all levels.",
        startTime: addDays(4),
        location: "Juniper Hill Park",
        category: "workshop",
        isFree: true,
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
      {
        title: "Local Craft Beer Festival",
        description: "Taste craft beers from 15+ local and regional breweries. Includes food trucks, live music, and brewery games.",
        startTime: addDays(8),
        location: "Lexington Convention Center",
        category: "food",
        isFree: false,
        imageUrl: "https://images.unsplash.com/photo-1608516320246-0f322e29f8d5?auto=format&fit=crop&q=80",
        sourceUrl: "#"
      },
    ];

    for (const event of sampleEvents) {
      await storage.createEvent(event);
    }
  }
}
