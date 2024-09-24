import React, { useContext, useEffect, useRef, useState } from "react";
import { PopupProps } from "../common/models/popup";
import Route, { Stop } from "../common/models/route";
import RouteContext from "../context/routesContext";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const PopupComponent: React.FC<PopupProps> = ({
  routesList,
  editRoute,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { setRoutesList, setSelectedRoute } = useContext(RouteContext);
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
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (placesLib && autocompleteInputRef.current) {
      const autocomplete = new placesLib.Autocomplete(
        autocompleteInputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "in" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setNewStop({
          ...newStop,
          StopName: place?.formatted_address,
          Latitude: place?.geometry?.location?.lat(),
          Longitude: place?.geometry?.location?.lng(),
        });
      });
    }
  }, [placesLib]);

  useEffect(() => {
    if (editRoute != undefined) {
      setRoute(editRoute);
      // console.log(route)
    } else {
      setRoute({
        Name: "",
        Direction: "UP",
        RouteId: "",
        Status: "Active",
        Stops: [],
      });
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

    if (autocompleteInputRef.current) {
      autocompleteInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editRoute != undefined) {
      const routeIndex = routesList.findIndex((x) => {
        return x.RouteId == editRoute.RouteId;
      });
      const list1 = [...routesList];
      list1[routeIndex] = route;
      setRoutesList(list1);
      setRoute({
        Name: "",
        Direction: "UP",
        RouteId: "",
        Status: "Active",
        Stops: [],
      });
      setSelectedRoute(route);
      onClose();
      return;
    }
    const list: Route[] = [...routesList];
    list.push(route);
    setSelectedRoute(route);
    onSubmit(list);
    onClose();
  };

  const removeStop = (index: number) => {
    setRoute((prev) => ({
      ...prev,
      Stops: prev.Stops.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
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
                <p className="text-xs text-gray-500 mb-2">
                  *Select at least 2 stops to define a route
                </p>
                <div className="space-y-2 mb-2">
                  {route.Stops.map((stop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <div>
                        <span className="font-semibold">{stop.StopName}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({stop.Latitude?.toFixed(4)},{" "}
                          {stop.Longitude?.toFixed(4)})
                        </span>
                      </div>
                      <button
                        onClick={() => removeStop(index)}
                        className="text-red-500 hover:text-red-700"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    ref={autocompleteInputRef}
                    type="text"
                    placeholder="Enter a location"
                    className="border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    name="StopId"
                    value={newStop.StopId}
                    onChange={handleStopChange}
                    placeholder="Stop ID"
                    className="border rounded px-2 py-1"
                  />
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
                  disabled={route?.Stops?.length < 2}
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {editRoute ? "Update Route " : "Create Route"}
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
