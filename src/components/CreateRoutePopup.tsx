import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { PopupProps } from "../common/popup";
import Route, { Stop } from "../common/route";
import RouteContext from "../context/routesContext";

const PopupComponent: React.FC<PopupProps> = ({
  routesList,
  editRoute,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const Autocomplete = lazy(() => import("react-google-autocomplete"));
  const {setRoutesList} = useContext(RouteContext)
  const [route, setRoute] = useState<Route>({
    Name: "",
    Direction: "UP",
    RouteId: "",
    Status: "Active",
    Stops: [],
  });

  const [newStop, setNewStop] = useState<Stop>({
    StopId: "",
    StopName: "",
    Latitude: 0,
    Longitude: 0,
  });
  const autocompleteRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (editRoute != undefined) {
      setRoute(editRoute);
      // console.log(route)
    } else{
      setRoute({
        Name: "",
        Direction: "UP",
        RouteId: "",
        Status: "Active",
        Stops: [],
      })
    }
  }, [editRoute]);

  if (!isOpen) return null;

  const handleRouteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRoute((prev) => ({ ...prev, [name]: value }));
  };

  const handleStopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStop((prev) => ({
      ...prev,
      [name]:
        name === "Latitude" || name === "Longitude" ? parseFloat(value) : value,
    }));
  };

  const addStop = () => {
    setRoute((prev) => ({ ...prev, Stops: [...prev.Stops, newStop] }));
    setNewStop({ StopId: "", StopName: "", Latitude: 0, Longitude: 0 });

    if (autocompleteRef.current) {
      autocompleteRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      if(editRoute !=undefined){
        const routeIndex = routesList.findIndex((x)=>{return x.RouteId == editRoute.RouteId});
        const list1 = [...routesList];
        list1[routeIndex] = route;
          setRoutesList(list1);
          setRoute({
            Name: "",
            Direction: "UP",
            RouteId: "",
            Status: "Active",
            Stops: [],
          })
          onClose();
        return;
      }
      const list: Route[] = [...routesList];
      list.push(route);
      onSubmit(list);
      onClose();
  };

  const removeStop = (index: number) => {
    setRoute(prev => ({
      ...prev,
      Stops: prev.Stops.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create New Route</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={route.Name}
                  onChange={handleRouteChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Direction:</label>
                <select
                  name="Direction"
                  value={route.Direction}
                  onChange={handleRouteChange}
                  className="w-full border rounded px-2 py-1"
                  required
                >
                  <option value="UP">UP</option>
                  <option value="DOWN">DOWN</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Route ID:</label>
                <input
                  type="text"
                  name="RouteId"
                  value={route.RouteId}
                  onChange={handleRouteChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status:</label>
                <select
                  name="Status"
                  value={route.Status}
                  onChange={handleRouteChange}
                  className="w-full border rounded px-2 py-1"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Stops:</h3>
                <p>*Select atleast 2 stops to define a route</p>
                {route.Stops.map((stop, index) => (
                  <div key={index} className="mb-2">
                    <span>{stop.StopName} ({stop.Latitude}, {stop.Longitude})</span>
                    <button 
                      onClick={() => removeStop(index)}
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">

                  {/* <label className="block mb-2">Stop Name (Autocomplete):</label> */}
                  {/* <Autocomplete
                    ref={autocompleteRef}
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                      setNewStop({
                        ...newStop,
                        StopName: place?.formatted_address,
                        Latitude: place?.geometry?.location?.lat(),
                        Longitude: place?.geometry?.location?.lng(),
                      });
                    }}
                    options={{
                      types: ['geocode'],
                      componentRestrictions: { country: 'in' },
                    }}
                    className="border rounded px-2 py-1"
                  /> */}
                  <Suspense fallback={<div>Loading...</div>}>
                  <Autocomplete
                    ref={autocompleteRef}
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                      setNewStop({
                        ...newStop,
                        StopName: place?.formatted_address,
                        Latitude: place?.geometry?.location?.lat(),
                        Longitude: place?.geometry?.location?.lng(),
                      });
                    }}
                    options={{
                      types: ['geocode'],
                      componentRestrictions: { country: 'in' },
                    }}
                    className="border rounded px-2 py-1"
                  />
                  </Suspense>
                  <input
                    type="text"
                    name="StopId"
                    value={newStop.StopId}
                    onChange={handleStopChange}
                    placeholder="Stop ID"
                    className="border rounded px-2 py-1"
                  />
                  {/* <input
                    type="text"
                    name="StopName"
                    value={newStop.StopName}
                    onChange={handleStopChange}
                    placeholder="Stop Name"
                    className="border rounded px-2 py-1"
                  /> */}
                  <input
                    type="number"
                    name="Latitude"
                    value={newStop.Latitude}
                    onChange={handleStopChange}
                    placeholder="Latitude"
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    name="Longitude"
                    value={newStop.Longitude}
                    onChange={handleStopChange}
                    placeholder="Longitude"
                    className="border rounded px-2 py-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={addStop}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Stop
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  disabled = {route?.Stops?.length <2}
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {editRoute ?"Update Route ": "Create Route"}
                </button>
              </div>
              {/* <p>{"Select atleast 2 stops to define a route"}</p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
