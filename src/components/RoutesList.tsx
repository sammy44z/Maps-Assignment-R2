import Route from "../common/route";
import mockRouteList from "../Utils/mockData"
import RouteDisplay from "./RouteDisplay";


function RoutesList(){
    return (
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Routes List</h2>
              <div className="space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
            {mockRouteList.map((route: Route, index: number) => (
                <RouteDisplay 
                    key={route.RouteId}
                    index={index}
                    route={route}
                />
            ))}
          </div>
        </div>
      );
}

export default RoutesList;