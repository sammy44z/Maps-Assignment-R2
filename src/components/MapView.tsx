import React, { useEffect, useState } from "react";
import { Map } from '@vis.gl/react-google-maps';
import LatLong from "../common/location";

function MapView() {
  const [location, setLocation] = useState<LatLong|null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setError(`Error: ${error.message}`);
      }
    );
  }, []);

  return (
    <React.Fragment>
      {error ? (
        <div>{error}</div>
      ) : !location ? (
        <div>Loading location...</div>
      ) : (
        <Map
          style={{
            width: "100vw",
            height: "60vh",
            margin: "auto",
          }}
          defaultCenter={location}
          defaultZoom={9}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      )}
    </React.Fragment>
  );
}

export default MapView;