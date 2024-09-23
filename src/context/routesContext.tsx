import { createContext, Dispatch, SetStateAction } from "react";
import Route from "../common/models/route";


export interface RouteContextType {
    routesList: Route[];
    setRoutesList: Dispatch<SetStateAction<Route[]>>;
    selectedRoute: Route;
    setSelectedRoute: Dispatch<SetStateAction<Route>>;
  }

  
const RouteContext = createContext<RouteContextType>({} as RouteContextType);

export default RouteContext;