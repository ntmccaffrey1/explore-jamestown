Project Proposal: NEBULAR Weather & News App

Tech Stack

- Frontend: 
    - React.js: (Web)
    - React Native: Maybe create this as a mobile app

- Backend:
    - Node.js with Express: To manage API requests, uer prefs, and integrations with weather/news APIs

- Database:
    - MongoDB: Store user data, saved locations, location search history, caching(?)

- Hosting:
    - Heroku or Railway: Host backend
    - Vercel or Netlify: Deploying frontend


Project Focus

A sci fi themed weather app that provides live weather data, news and saves user preferences into a dashboard. The
site will have the traditional hourly, daily, 7 day forecast, radar, weather news related to your area, all in an
elegant sci fi based dark theme. The stack focus will probably be mainly frontend but will also have a backend focus.


Project Type

Web App: Users can customize their own dashboard and save locations they want to be displayed on their dashboards.


Project Goal

Create an elegant dark themed weather dashboard that is fully customizable for the user based on their location
and their saved preferences.


User Demographic

Everyday Users: Anyone looking for a clean, personalized way to check the weather and news.


Data and API

Weather API:
    - OpenWeatherMap API or WeatherAPI to fetch real time weather forecasts

News API: 
    - NewsAPI.org or NYTimes API for real time news


Project Approach

Database Schema:
    - User: username, email, locations, preferences
    - Location: name, coordinates, id
    - WeatherCache: (maybe) city, weatherdata

Data Source:
    - Data will be coming from two or three different APIs
    - Show latency with loading screens and API errors

Sensitive Info:
    - User data will be limited to preferences and saved locations
    - Authentication may or may not be necessary

Functionality:
    - Users will first be given a search bar that will populate the weather data based on their query
    - Once users have saved a location that location data will be saved be default when visiting the site
    - A dashboard will be shown by default until a new location is entered

User Flow:
    - First time visitor: Option to login or search their location
    - Dashboard is generated with weather content after location is queried
    - User has option to add / remove blocks of different info on their dashboard

Setup Backend and DB:
    - Setup Node/Express server
    - Setup MongoDB

Setup Frontend:
    - Use Vite to setup base React files

User Auth:
    - Probably have users login via Google account