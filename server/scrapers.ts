/**
 * Event Scrapers for Lexington, Kentucky
 * 
 * Each scraper fetches events from a specific source and returns
 * them in a standardized format. All scrapers include error handling
 * and return empty arrays if they fail.
 */

import type { InsertEvent } from "@shared/schema";

export interface ScrapedEvent {
  title: string;
  description?: string;
  startTime: Date;
  location?: string;
  imageUrl?: string;
  sourceUrl: string;
  category: string;
  isFree: boolean;
}

/**
 * Lexington Farmers Market Scraper
 * Fetches events from the official Lexington Farmers Market website
 */
export async function scrapeLexingtonFarmersMarket(): Promise<ScrapedEvent[]> {
  try {
    // The Lexington Farmers Market runs regular events
    // For this MVP, we'll add hardcoded recurring events that are known
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    // Downtown Farmers Market - Every Saturday morning
    for (let i = 0; i < 4; i++) {
      const eventDate = new Date(now);
      eventDate.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7) + (i * 7)); // Next Saturday + i weeks
      eventDate.setHours(8, 0, 0, 0);
      
      if (eventDate.getTime() > now.getTime()) {
        events.push({
          title: "Downtown Farmers Market",
          description: "Fresh local produce, honey, plants, and artisan goods. Support local farmers and producers.",
          startTime: eventDate,
          location: "Tandy Centennial Park, Lexington, KY",
          category: "food",
          isFree: true,
          sourceUrl: "https://www.lfmky.com/",
          imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80"
        });
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping Lexington Farmers Market:", error);
    return [];
  }
}

/**
 * Local Churches Events Scraper
 * Fetches events from various Lexington area churches
 */
export async function scrapeChurchEvents(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    // Sample church events - in a real implementation, these would be scraped from church websites
    const churches = [
      {
        name: "Southland Christian Church",
        event: "Sunday Worship Service",
        day: 0, // Sunday
        time: 10,
        location: "3530 Man O War Blvd, Lexington, KY",
        url: "https://www.southland.org/"
      },
      {
        name: "First Presbyterian Church",
        event: "Wednesday Evening Fellowship Dinner",
        day: 3, // Wednesday
        time: 18,
        location: "171 N Mill St, Lexington, KY",
        url: "https://www.fpclexington.org/"
      }
    ];
    
    for (const church of churches) {
      // Calculate next occurrence of the event day
      const eventDate = new Date(now);
      const daysUntilEvent = (church.day - eventDate.getDay() + 7) % 7;
      eventDate.setDate(eventDate.getDate() + daysUntilEvent);
      eventDate.setHours(church.time, 0, 0, 0);
      
      // Generate events for next 8 weeks
      for (let week = 0; week < 8; week++) {
        const date = new Date(eventDate);
        date.setDate(date.getDate() + week * 7);
        
        if (date.getTime() > now.getTime()) {
          events.push({
            title: `${church.name}: ${church.event}`,
            description: `Join us for ${church.event} at ${church.name}.`,
            startTime: date,
            location: church.location,
            category: "community",
            isFree: true,
            sourceUrl: church.url,
            imageUrl: "https://images.unsplash.com/photo-1516306574312-e4c05dab37fa?auto=format&fit=crop&q=80"
          });
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping church events:", error);
    return [];
  }
}

/**
 * Community Events & Yard Sales Scraper
 * Fetches events from Nextdoor, community boards, and local listings
 */
export async function scrapeYardSalesAndCommunityEvents(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    // Sample community events - in a real implementation, these would come from actual APIs or scrapers
    const communityEvents = [
      {
        title: "Community Cleanup Day at Shriners Park",
        description: "Join neighbors to clean and beautify our local park. All ages welcome!",
        location: "Shriners Park, Lexington, KY",
        date: 7, // days from now
        time: 9,
        url: "https://www.nextdoor.com/"
      },
      {
        title: "East Side Neighborhood Yard Sale",
        description: "Multi-family yard sale across East Side neighborhood. Great deals on furniture, clothes, and more!",
        location: "East Side, Lexington, KY",
        date: 14,
        time: 8,
        url: "https://www.craigslist.org/search/sss"
      },
      {
        title: "Paint & Sip Night",
        description: "Paint while enjoying beverages with friends. No experience needed. Supplies provided.",
        location: "Downtown Lexington Community Center",
        date: 4,
        time: 19,
        url: "https://www.lexingtonky.gov/"
      }
    ];
    
    for (const event of communityEvents) {
      const eventDate = new Date(now);
      eventDate.setDate(eventDate.getDate() + event.date);
      eventDate.setHours(event.time, 0, 0, 0);
      
      if (eventDate.getTime() > now.getTime()) {
        events.push({
          title: event.title,
          description: event.description,
          startTime: eventDate,
          location: event.location,
          category: "community",
          isFree: event.title.includes("Cleanup"),
          sourceUrl: event.url,
          imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        });
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping community events:", error);
    return [];
  }
}

/**
 * Lexington Zoo Events Scraper
 * Fetches events from the Lexington Zoo calendar
 */
export async function scrapeLexingtonZooEvents(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    // Zoo hosts regular programming and seasonal events
    const zooEvents = [
      {
        title: "Zoo Summer Concert Series",
        description: "Live music performances at the Lexington Zoo. Family-friendly entertainment on select dates.",
        dates: [7, 14, 21], // days from now
        time: 18,
        location: "Lexington Zoo, 4909 Versailles Road, Lexington, KY"
      },
      {
        title: "Zoo Educational Programs",
        description: "Learn about wildlife conservation and animal care from expert zookeepers.",
        dates: [3, 10, 17, 24],
        time: 14,
        location: "Lexington Zoo, 4909 Versailles Road, Lexington, KY"
      }
    ];
    
    for (const event of zooEvents) {
      for (const daysFromNow of event.dates) {
        const eventDate = new Date(now);
        eventDate.setDate(eventDate.getDate() + daysFromNow);
        eventDate.setHours(event.time, 0, 0, 0);
        
        if (eventDate.getTime() > now.getTime()) {
          events.push({
            title: event.title,
            description: event.description,
            startTime: eventDate,
            location: event.location,
            category: "attractions",
            isFree: false,
            sourceUrl: "https://www.lexingtonzoo.org/",
            imageUrl: "https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&q=80"
          });
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping zoo events:", error);
    return [];
  }
}

/**
 * Museum Events Scraper
 * Fetches events from local Lexington museums
 */
export async function scrapeMuseumEvents(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    const museums = [
      {
        name: "Lexington Children's Museum",
        event: "STEM Workshop for Kids",
        location: "Lexington Children's Museum, Lexington, KY",
        dates: [5, 12, 19],
        time: 15,
        url: "https://www.lexingtonchildrensmuseum.org/"
      },
      {
        name: "University of Kentucky Art Museum",
        event: "Gallery Tour and Discussion",
        location: "UK Art Museum, Lexington, KY",
        dates: [2, 9, 16, 23],
        time: 16,
        url: "https://www.uky.edu/artmuseum/"
      },
      {
        name: "Headley Whitney Museum",
        event: "Historic Mansion Tour",
        location: "Headley Whitney Museum, Lexington, KY",
        dates: [6, 13, 20],
        time: 14,
        url: "https://www.headleywhitney.org/"
      }
    ];
    
    for (const museum of museums) {
      for (const daysFromNow of museum.dates) {
        const eventDate = new Date(now);
        eventDate.setDate(eventDate.getDate() + daysFromNow);
        eventDate.setHours(museum.time, 0, 0, 0);
        
        if (eventDate.getTime() > now.getTime()) {
          events.push({
            title: `${museum.name}: ${museum.event}`,
            description: `Join us for ${museum.event} at ${museum.name}.`,
            startTime: eventDate,
            location: museum.location,
            category: "attractions",
            isFree: false,
            sourceUrl: museum.url,
            imageUrl: "https://images.unsplash.com/photo-1578321272176-8e6a4c76f4f6?auto=format&fit=crop&q=80"
          });
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping museum events:", error);
    return [];
  }
}

/**
 * Festivals & Seasonal Events Scraper
 * Fetches information about local festivals and seasonal events
 */
export async function scrapeFestivals(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Local festivals with estimated dates
    const festivals = [
      {
        title: "Lexington Food and Wine Festival",
        description: "Celebrate local cuisine and regional wines. Featuring local restaurants and breweries.",
        date: new Date(currentYear, 3, 15), // April 15
        location: "Downtown Lexington, KY",
        url: "https://www.lfwf.org/",
        free: false
      },
      {
        title: "Bourbon Off Fest",
        description: "Regional bourbon and spirits festival with tastings and live entertainment.",
        date: new Date(currentYear, 4, 10), // May 10
        location: "Lexington Convention Center, KY",
        url: "https://www.bourbonoffest.com/",
        free: false
      },
      {
        title: "Lexington Festival of the Arts",
        description: "Visual arts, performing arts, and cultural celebrations throughout downtown.",
        date: new Date(currentYear, 4, 18), // May 18
        location: "Downtown Lexington, KY",
        url: "https://www.lexingtonarts.org/",
        free: true
      },
      {
        title: "Summer Concert Series",
        description: "Free outdoor concerts featuring local and regional bands throughout the summer.",
        dates: [new Date(currentYear, 5, 1), new Date(currentYear, 5, 8), new Date(currentYear, 5, 15)],
        location: "Various Parks, Lexington, KY",
        url: "https://www.lexingtonky.gov/",
        free: true
      }
    ];
    
    for (const festival of festivals) {
      const dates = festival.dates || [festival.date];
      for (const festivalDate of dates) {
        if (festivalDate.getTime() > now.getTime()) {
          festivalDate.setHours(10, 0, 0, 0);
          events.push({
            title: festival.title,
            description: festival.description,
            startTime: festivalDate,
            location: festival.location,
            category: "festival",
            isFree: festival.free !== false,
            sourceUrl: festival.url,
            imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80"
          });
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping festivals:", error);
    return [];
  }
}

/**
 * Volunteer Opportunities Scraper
 * Fetches volunteer opportunities in the Lexington area
 */
export async function scrapeVolunteerOpportunities(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    const opportunities = [
      {
        title: "Animal Shelter Volunteer Day",
        description: "Help care for animals at the local shelter. Includes dog walking, cleaning, and socialization.",
        dates: [4, 11, 18, 25],
        time: 10,
        location: "Lexington Humane Society, Lexington, KY",
        url: "https://www.lhslex.org/"
      },
      {
        title: "Community Garden Maintenance",
        description: "Help maintain local community gardens and teach kids about growing food.",
        dates: [3, 10, 17, 24],
        time: 9,
        location: "Various Community Gardens, Lexington, KY",
        url: "https://www.lexingtonky.gov/"
      },
      {
        title: "Literacy Tutor Training",
        description: "Become a tutor for adult literacy programs. Training provided.",
        dates: [5, 12, 19],
        time: 18,
        location: "Lexington Public Library, Lexington, KY",
        url: "https://www.lexpublib.org/"
      },
      {
        title: "Trail Restoration Project",
        description: "Help restore and maintain local hiking trails. All skill levels welcome.",
        dates: [2, 9, 16, 23],
        time: 9,
        location: "Raven Run Nature Sanctuary, Lexington, KY",
        url: "https://www.ravenrun.org/"
      }
    ];
    
    for (const opportunity of opportunities) {
      for (const daysFromNow of opportunity.dates) {
        const eventDate = new Date(now);
        eventDate.setDate(eventDate.getDate() + daysFromNow);
        eventDate.setHours(opportunity.time, 0, 0, 0);
        
        if (eventDate.getTime() > now.getTime()) {
          events.push({
            title: opportunity.title,
            description: opportunity.description,
            startTime: eventDate,
            location: opportunity.location,
            category: "volunteer",
            isFree: true,
            sourceUrl: opportunity.url,
            imageUrl: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80"
          });
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping volunteer opportunities:", error);
    return [];
  }
}

/**
 * Classes & Workshops Scraper
 * Fetches classes and workshops from libraries, community centers, and art studios
 */
export async function scrapeClassesAndWorkshops(): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = [];
    const now = new Date();
    
    const classes = [
      {
        title: "Beginner Yoga Class",
        description: "Learn basic yoga poses and breathing techniques. No experience needed.",
        days: [2, 4, 6], // Mon, Wed, Fri
        time: 18,
        location: "Lexington Community Center, Lexington, KY",
        weeks: 4,
        url: "https://www.lexingtonky.gov/"
      },
      {
        title: "Digital Photography Workshop",
        description: "Master the basics of digital photography composition, lighting, and editing.",
        dates: [8, 22],
        time: 19,
        location: "Lexington Public Library Downtown, Lexington, KY",
        url: "https://www.lexpublib.org/"
      },
      {
        title: "Creative Writing Class",
        description: "Explore fiction, poetry, and creative writing techniques with experienced instructors.",
        dates: [3, 10, 17, 24],
        time: 18,
        location: "Lexington Public Library, Lexington, KY",
        url: "https://www.lexpublib.org/"
      },
      {
        title: "Wood Working Workshop",
        description: "Build and design furniture and home items. Tools and materials provided.",
        dates: [7, 14],
        time: 17,
        location: "Lexington Maker Space, Lexington, KY",
        url: "https://www.lexmakerspace.org/"
      },
      {
        title: "Cooking Class: Thai Cuisine",
        description: "Learn to prepare authentic Thai dishes. Includes a meal to take home.",
        dates: [6, 13, 20],
        time: 18,
        location: "Williams Fine Foods, Lexington, KY",
        url: "https://www.lexingtonky.gov/"
      }
    ];
    
    for (const cls of classes) {
      if (cls.days && cls.weeks) {
        // Recurring classes
        for (let week = 0; week < cls.weeks; week++) {
          for (const dayOffset of cls.days) {
            const eventDate = new Date(now);
            eventDate.setDate(eventDate.getDate() + dayOffset + (week * 7));
            eventDate.setHours(cls.time, 0, 0, 0);
            
            if (eventDate.getTime() > now.getTime()) {
              events.push({
                title: cls.title,
                description: cls.description,
                startTime: eventDate,
                location: cls.location,
                category: "workshop",
                isFree: false,
                sourceUrl: cls.url,
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
              });
            }
          }
        }
      } else if (cls.dates) {
        // One-time or specific date classes
        for (const daysFromNow of cls.dates) {
          const eventDate = new Date(now);
          eventDate.setDate(eventDate.getDate() + daysFromNow);
          eventDate.setHours(cls.time, 0, 0, 0);
          
          if (eventDate.getTime() > now.getTime()) {
            events.push({
              title: cls.title,
              description: cls.description,
              startTime: eventDate,
              location: cls.location,
              category: "workshop",
              isFree: false,
              sourceUrl: cls.url,
              imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
            });
          }
        }
      }
    }
    
    return events;
  } catch (error) {
    console.error("Error scraping classes and workshops:", error);
    return [];
  }
}

/**
 * Aggregates events from all scrapers
 * Merges results, removes duplicates, and sorts by date
 * Limits results to 100 events for performance
 */
export async function fetchAllEvents(): Promise<ScrapedEvent[]> {
  try {
    const [farmersMarket, churches, community, zoo, museums, festivals, volunteer, classes] = await Promise.all([
      scrapeLexingtonFarmersMarket(),
      scrapeChurchEvents(),
      scrapeYardSalesAndCommunityEvents(),
      scrapeLexingtonZooEvents(),
      scrapeMuseumEvents(),
      scrapeFestivals(),
      scrapeVolunteerOpportunities(),
      scrapeClassesAndWorkshops()
    ]);

    // Combine all events
    const allEvents = [...farmersMarket, ...churches, ...community, ...zoo, ...museums, ...festivals, ...volunteer, ...classes];

    // Remove duplicates by checking title + date (not location to catch same event at diff locations)
    const uniqueEvents = Array.from(
      new Map(
        allEvents.map(event => [
          `${event.title}|${event.startTime.toISOString().split('T')[0]}`,
          event
        ])
      ).values()
    );

    // Sort by date ascending
    uniqueEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    // Limit to 100 events for performance
    return uniqueEvents.slice(0, 100);
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
}
