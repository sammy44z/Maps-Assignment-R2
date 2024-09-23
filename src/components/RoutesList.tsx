import { useContext, useRef, useState } from "react";
import Route from "../common/models/route";
import PopupComponent from "./CreateRoutePopup";
import RouteDisplay from "./RouteDisplay";
import RouteContext from "../context/routesContext";

function RoutesList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { routesList, setRoutesList, setSelectedRoute } =
    useContext(RouteContext);
  const [editRoute, setEditRoute] = useState<Route | undefined>(undefined);
  function updateRoute(route: Route) {
    setEditRoute(route);
    setIsPopupOpen(true);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onclose() {
    // setEditRoute(undefined);
    setIsPopupOpen(false);
  }

  function addRoute() {
    setEditRoute(undefined);
    setIsPopupOpen(true);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(routesList)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "routes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedRoutes = JSON.parse(content) as Route[];
          setRoutesList(prevRoutes => [...prevRoutes, ...importedRoutes])
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Error importing file. Please make sure it's a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
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
              <button onClick={() => fileInputRef.current?.click()}  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Import
              </button>
              <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImport}
                  accept=".json"
                />
              <button
                onClick={handleExport}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {routesList.map((route: Route, index: number) => (
            <div
              key={route.RouteId}
              onClick={() => {
                setSelectedRoute(route);
              }}
            >
              <RouteDisplay
                index={index}
                route={route}
                setEditRoute={updateRoute}
              />
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div>
          <PopupComponent
            routesList={routesList}
            editRoute={editRoute}
            isOpen={isPopupOpen}
            onClose={onclose}
            onSubmit={setRoutesList}
          />
        </div>
      )}
    </>
  );
}

export default RoutesList;
