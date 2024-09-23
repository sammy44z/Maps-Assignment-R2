import { APIProvider } from "@vis.gl/react-google-maps";
import { Outlet } from "react-router-dom";
import RouteContext from "./context/routesContext";
import { useState } from "react";
import Route from "./common/route";
import mockRouteList from "./Utils/mockData";

function App() {

  const [routesList, setRoutesList] = useState<Route[]>(mockRouteList);
  const [selectedRoute, setSelectedRoute] = useState<Route>(mockRouteList[0]);
  
  return (
    <RouteContext.Provider value={{ routesList, setRoutesList, selectedRoute, setSelectedRoute }}>
      <APIProvider apiKey={"AIzaSyCItlF7EotBQE82cfgFVGBm5wzJGNNsUyg"}>
        <Outlet />
      </APIProvider>
    </RouteContext.Provider>
  );
}

export default App;
