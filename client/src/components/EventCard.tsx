import { Link } from "wouter";
import { Calendar, MapPin, Tag } from "lucide-react";
import { format } from "date-fns";
import type { Event } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/events/${event.id}`}>
        <Card className="group h-full overflow-hidden cursor-pointer border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">
                <Calendar className="w-12 h-12 opacity-20" />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              {event.isFree && (
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary shadow-sm font-bold">
                  FREE
                </Badge>
              )}
              <Badge className="bg-primary/90 backdrop-blur-sm shadow-sm capitalize">
                {event.category}
              </Badge>
            </div>
          </div>
          
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(event.startTime), "EEE, MMM d • h:mm a")}
            </div>
            
            <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{event.location || "TBA"}</span>
            </div>
            
            <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                View Details
              </span>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
