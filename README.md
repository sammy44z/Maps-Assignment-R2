# Route Management Application

This React application allows users to manage routes by creating, editing, and displaying them with multiple stops using the Google Maps API for location autocomplete and map visualization.

## Features

- **Create Routes**: Add new routes with multiple stops.
- **Edit Routes**: Modify existing routes.
- **Autocomplete for Locations**: Use Google Maps Places API to autocomplete stop names.
- **Map Visualization**: Display routes on a map using Google Maps.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **@vis.gl/react-google-maps**: A library for integrating Google Maps with React.
- **Google Maps Places API**: Provides location autocomplete functionality.
- **React Router**: For handling navigation within the app.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/route-management-app.git
   cd route-management-app

2. **Install Dependencies**
    Run the following command to install all necessary dependencies:
    npm install

3. **Set Up Environment Variables**
    Create a .env file in the root directory and add your Google Maps API key
    VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

4. **Run the Application**
    Start the development server:
    npm run dev

## Usage
**Creating a New Route**
  Click on "Create New Route".
  Enter route details such as Name, Direction, and Status.
  Use the autocomplete input to add stops.
  Click "Add Stop" to include each stop in the route.
  Once all stops are added, click "Create Route".
**Editing a Route**
  Select a route from the list.
  Modify any details or stops as needed.
  Click "Update Route" to save changes.
**Viewing Routes on Map**
  Select a route from the list to view it on the map.
  The map will display all stops along with paths connecting them.

## Code Structure
**Components**
  CreateRoutePopup.tsx: Handles creating and editing routes with autocomplete functionality.
  MapView.tsx: Displays routes on a Google Map.
  RouteDisplay.tsx: Displays individual route information.
  RoutesList.tsx: Lists all available routes.
**Contexts**
routesContext.tsx: Provides global state management for routes.
**Models**
  location.ts: Defines location data structures.
  popup.ts: Defines popup properties and types.
  route.ts: Defines route and stop data structures.
