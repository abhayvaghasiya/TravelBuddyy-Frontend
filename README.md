# TravelBuddy - Frontend

TravelBuddy is a web application that helps travelers choose nearby trips and itineraries tailored to their age group and budget. This repository contains the frontend part of the application, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Browse recommended destinations filtered by age group and budget
- View detailed information about destinations including attractions
- Plan trips with a simple itinerary planner that provides cost breakdown
- Responsive design suitable for desktop and mobile devices

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **React Router** - Page routing
- **Axios** - API communication
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

## Project Structure

```
TravelBuddyy-Frontend/
├── src/
│   ├── assets/        # Static assets like images
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service calls
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component with routing
│   └── main.tsx       # Application entry point
├── public/            # Public static files
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Getting Started

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TravelBuddyy-Frontend.git
   cd TravelBuddyy-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Running with Docker

The complete application can be run using Docker Compose from the parent directory:

```bash
docker compose up --build
```

This will start both the frontend and backend services.

## Backend Repository

The backend for this application is built with Spring Boot and can be found at [TravelBuddyy-Backend](https://github.com/yourusername/TravelBuddyy-Backend).

## Future Enhancements

- User authentication and profile management
- Saving favorite destinations
- Social sharing
- User reviews and ratings
- Mobile app version

## License

MIT