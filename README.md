![logo](./public/favicon.png)

# Explore Jamestown

Explore Jamestown is a modern web app for discovering lodging, dining, activities, and events in Jamestown, Rhode Island. It scrapes data from the Discover Newport website
to create a curated view of everything to do and what is going on in Jamestown, Rhode Island.

The app is built with Next.js, Prisma, MongoDB, and built on a custom theme with scalable data modeling.

Live site: https://explore-jamestown.com


## Features

Places: Dining, lodging and activities around Jamestown, RI
Events: Events shows all events in Jamestown, RI and neighboring regions
Favorites System: Logged in users can login and favorite any item on the site to their account page and build their own favorites list
Responsive UI: Theme is custom built with CSS and fully responsive
Authentication: GoogleAuth via NextAuth


## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Custom CSS theme
- Swiper.js

### Backend
- Next.js API routes
- Prisma
- MongoDB

### Auth
- NextAuth (Google OAuth)


### Data
- Scraped public events and places data from Discover Newport website
- Normalized and stored in MongoDB
- Duplicates are auto filtered


## Roadmap

- Add a filtering system
- Integrate yelp reviews
- Map based browsing
- Find alternate data sourcing
- Build admin UI for editing items
- Allow logged in users ability to create their own events for admin approval


## Disclaimer

Explore Jamestown is an independent project and is not affiliated with the Town of Jamestown or any listed businesses. Event and place data is sourced from publicly available information and may change.    


## Author

Nolan McCaffrey
Full Stack Web Developer
https://nolanmccaffrey.com