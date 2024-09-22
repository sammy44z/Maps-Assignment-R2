import Route from "../common/route";

function RouteDisplay({ route, index}: { route: Route, index: number}) {
    return (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold">{route.Name}</h3>
                <p className="text-gray-600">Direction: {route.Direction}</p>
                <p className="text-gray-600">Status: {route.Status}</p>
                <p className="text-gray-600">Stops: {route.Stops.length}</p>
            </div>
    )
}

export default RouteDisplay;