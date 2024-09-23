import {  useContext, useState } from "react";
import Route from "../common/route";
import PopupComponent from "./CreateRoutePopup";
import RouteDisplay from "./RouteDisplay";
import RouteContext from "../context/routesContext";

function RoutesList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {routesList,setRoutesList,setSelectedRoute} = useContext(RouteContext);
  const [editRoute, setEditRoute] = useState<Route|undefined>(undefined);
  function updateRoute(route:Route){
    setEditRoute(route);
    setIsPopupOpen(true);
  }

  function onclose(){
    // setEditRoute(undefined);
    setIsPopupOpen(false);
  }

  function addRoute(){
    setEditRoute(undefined);
    setIsPopupOpen(true)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Routes List</h2>
            <div className="space-x-2">
              <button
                onClick={addRoute}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Route
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Import
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {routesList.map((route: Route, index: number) => (
            <div  key={route.RouteId}  onClick={()=>{setSelectedRoute(route)}}>
            <RouteDisplay  index={index} route={route}  setEditRoute={updateRoute} />
              </div>
          ))}
        </div>
      </div>
      
      {isPopupOpen && <div>
        <PopupComponent
          routesList = {routesList} 
          editRoute={editRoute}
          isOpen={isPopupOpen}
          onClose={onclose}
          onSubmit={setRoutesList}
        />
      </div>}
    </>
  );
}

export default RoutesList;
