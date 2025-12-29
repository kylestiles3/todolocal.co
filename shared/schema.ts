import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  sourceUrl: text("source_url"),
  category: text("category").notNull(), // 'music', 'food', 'community', 'workshop'
  isFree: boolean("is_free").default(false),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
