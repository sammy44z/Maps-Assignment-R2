import React, { useContext, useEffect, useState } from "react";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import LatLong from "../common/models/location";
import RouteContext from "../context/routesContext";
interface Waypoint {
  location: {
    lat: number;
    lng: number;
  };
}
function MapView() {
  const [location, setLocation] = useState<LatLong | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const { selectedRoute } = useContext(RouteContext);

  const origin: LatLong = {
    lat: selectedRoute.Stops[0].Latitude,
    lng: selectedRoute.Stops[0].Longitude,
  };
  const destination: LatLong = {
    lat: selectedRoute.Stops[selectedRoute.Stops.length - 1].Latitude,
    lng: selectedRoute.Stops[selectedRoute.Stops.length - 1].Longitude,
  };

  const waypoints: Waypoint[] = selectedRoute.Stops.slice(
    1,
    selectedRoute.Stops.length - 1
  ).map((stop) => {
    return {
      location: { lat: stop.Latitude, lng: stop.Longitude },
      stopover: true,
    };
  });
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] =
    React.useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer>();

  // const markerRefs = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ map, suppressMarkers: false })
    );
  }, [map, routesLibrary]);

  useEffect(() => {
    setLocation({ lat: origin.lat, lng: origin.lng });
    if (!directionService || !directionsRenderer) {
      return;
    }

    directionService
      .route({
        origin: origin,
        destination: destination,
        waypoints: [...waypoints],
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [directionService, directionsRenderer, selectedRoute]);

  return (
    <React.Fragment>
      <div className="border-8 border-white rounded-lg overflow-hidden">
        <Map
          style={{
            width: "100%",
            height: "58vh",
            margin: "auto",
          }}
          defaultCenter={location}
          defaultZoom={9}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </div>
    </React.Fragment>
  );
}

export default MapView;
