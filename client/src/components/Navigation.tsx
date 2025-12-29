import { Link, useLocation } from "wouter";
import { CalendarDays, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-200">
                  <CalendarDays size={20} />
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Lexington Local
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Events
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
              About
            </Link>
            <Button size="sm" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
              <Plus className="w-4 h-4 mr-1" />
              Submit Event
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
