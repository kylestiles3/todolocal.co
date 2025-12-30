# Lexington Local Events Directory

## Overview
A modern event discovery platform for Lexington, Kentucky. Built with React + TypeScript + Vite + TailwindCSS frontend and Express backend.

## Project Status
- ✅ Frontend: Fully functional with event listing, filtering, and detail pages
- ✅ Backend: Express API with in-memory storage
- ✅ Database: PostgreSQL with Drizzle ORM ready
- ✅ Design: Modern responsive UI with shadcn components
- ✅ GitHub: Ready to push to GitHub (git initialized)
- ✅ Vercel: Configured for seamless deployment

## Key Features
- Event listings with responsive grid layout
- Filter tabs: All, This Week, Weekend, Free Events
- Search functionality across events
- Event detail pages with images, location, date/time
- Dark mode support
- Mobile-responsive design

## Architecture

### Frontend (client/src)
- **App.tsx**: Main router and layout
- **pages/**: Home, EventDetail, NotFound pages
- **components/**: EventCard, Navigation, EventCard
- **hooks/**: useEvents, useEvent for data fetching
- **lib/**: API client with TanStack Query

### Backend (server/)
- **index.ts**: Express server setup
- **routes.ts**: API endpoints for events
- **storage.ts**: In-memory storage interface
- **scrapers.ts**: Stub functions for future multi-source event collection

### Data Model (shared/schema.ts)
- Event with fields: title, description, startTime, location, imageUrl, category, isFree, sourceUrl

## Deployment

### Vercel Setup
1. Connect GitHub repository to Vercel
2. Build command: `npm run build`
3. Output directory: `dist/public`
4. vercel.json handles SPA routing (all client routes fallback to index.html)
5. Custom domain: todolocal.co (configure DNS CNAME to point to Vercel)

### GitHub Configuration
- Repository: todolocal.co
- All code is committed and ready to push
- .gitignore configured for node_modules, dist, and other build artifacts

## Recent Updates
- Added diverse sample event data (8+ events across multiple categories)
- Created scraper.ts with stub functions for future integrations:
  - Pop-up events
  - Yard sales
  - HOA/neighborhood events
  - Church events
  - Farmers markets
  - Open mic nights
  - Food trucks
  - Community classes
  - Volunteer opportunities
- Verified Vercel configuration for proper SPA routing

## Development Workflow
```bash
npm run dev        # Start development server (port 5000)
npm run build      # Build for production
npm run start      # Run production build
npm run check      # Type check
npm run db:push    # Push database schema changes
```

## Environment
- Node.js (Express backend)
- React 18 with Vite
- TailwindCSS for styling
- PostgreSQL (Replit built-in or external)
- SESSION_SECRET environment variable (required for production)

## Future Enhancements
- Implement web scrapers for real event data sources
- Add event submission form
- User authentication and saved events
- Event notifications
- Advanced filtering and sorting
- Integration with calendar services
