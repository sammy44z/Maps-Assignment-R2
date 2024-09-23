import { useContext } from "react";
import Route from "../common/route";
import RouteContext from "../context/routesContext";

function RouteDisplay({
  route,
  setEditRoute,
}: {
  route: Route;
  index: number;
  setEditRoute: (route: Route) => void;
}) {
  const { routesList, setRoutesList } = useContext(RouteContext);
  const { selectedRoute } = useContext(RouteContext);
  function handleEdit(route: Route) {
    setEditRoute(route);
  }

  function handleDelete(id: string) {
    const list = [...routesList];
    const updatedList = list.filter((route) => route.RouteId !== id);
    setRoutesList(updatedList);
  }
  console.log('Selected Route:', selectedRoute);
  console.log('Current Route:', route);
  return (
    <div
      key={route.RouteId}
      className={`w-full bg-white shadow-md border border-gray-200 rounded-lg ${
        selectedRoute && selectedRoute.RouteId === route.RouteId
          ? "border-2 border-blue-500"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between -mx-2">
          <div className="w-1/3 flex items-center px-2 py-1">
            <h1 className="text-lg font-semibold text-gray-800 mr-2">
              {route.RouteId} | {route.Name}
            </h1>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {route.Status}
            </span>
          </div>
          <div className="w-1/3 flex items-center space-x-4 px-2 py-1">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-1">Direction:</span>
              <span className="flex items-center">{route.Direction}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-1">Stops:</span>
              <span>{route.Stops.length}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {/* <span className="font-medium mr-1">Status:</span> */}
              <span className="flex">{route.Stops.map(stop => stop.StopName).join(', ')}</span>
            </div>
          </div>
          <div className="w-1/3 justify-end flex space-x-2 px-2 py-1">
            <button
              onClick={() => handleEdit(route)}
              className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(route.RouteId)}
              className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteDisplay;
