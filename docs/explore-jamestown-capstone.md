Project Proposal: Explore Jamestown

Tech Stack

- Frontend: 
    - Next.js (App Router)
    - React.js: (Web)
    - CSS
    - Swiper.js

- Backend:
    - Next.js API routes – Server-side logic and data fetching
    - Node.js – Runtime for scraping, normalization, and API handling

- Database:
    - MongoDB: Store user data, save events, locations, things to do, etc.

- Authentication:
    - NextAuth.js - Google OAuth    

- Hosting:
    - Vercel - Fronted + API routes
    - MongoDB Atlas


Project Focus

Explore Jamestown is a web app that focus' on everything going on in Jamestown Rhode Island. The app will scrape the Discover Newport website and possible other website to gather data for events, lodging, dining, and activities. It will be a great resource for 
tourists planning a visit or local residents to view events or other things to do around town.


Project Type

Web App: Users can login and create a favorites list or itinerary of things to do around town or they can just use the app without
logging in and view everything happening in Jamestown.


Project Goal

Create an elegant themed web app that allows users to search for all kinds of things they can do around Jamestown, RI.


User Demographic

- Local residents looking for events and things to do around town
- Tourists planning a trip to the island


Data and API

- OpenStreepMap or Mapbox: create an interactive map to show locations of things they are interested in
- Wikipedia: Historical data
- Eventbrite / AllEvents: Gather a list of all events happening in Jamestown
- Booking.com: Places to stay
- Tripadvisor / Yelp: Things to do (restaurants)
- May create my own API depending on what information I can't find


Project Approach

Database Schema:
    - User: name, email, favorites, etc
    - Place: name, description, images, address, email, website, social, etc.
    - Event: name, location, website, images, address, description, etc.
    - Favorites: userId, placeId, eventId

Data Source:
    - Data will come from scraping the Discover Newport for stage 1 and then build off of other sources eventually

Sensitive Info:
    - User data will be limited to saving favorites
    - OAuth handled via Google
    - No sensitive personal data will be saved
    - Users can fully use the app without logging in

Functionality / User Flow:
    - Users will enter the site at a homepage that shows the latest events, activities, things happening etc in town
    - They will have the option to login to create their own profile to favorite things to their account
    - There will be individual pages for each topic that will show data that has been scraped and saved to MongoDB 