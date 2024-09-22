import { Suspense } from "react";
import MapView from "./components/MapView";
import RoutesList from "./components/RoutesList";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    // <Provider store={routeStore}>
      <APIProvider apiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY || ""}>
        <div className="flex flex-col h-screen">
          <div className="h-1/3 overflow-auto">
            <RoutesList />
          </div>
          <div className="h-2/3">
            <Suspense fallback={<div>Loading...</div>}>{<MapView />}</Suspense>
          </div>
        </div>
      </APIProvider>
    // </Provider>
  );
}

export default App;
