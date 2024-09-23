import RoutesList from "./RoutesList";
import { Suspense } from "react";
import React from "react";

function Home() {

  const MapView = React.lazy(() => import('../components/MapView'));
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="h-1/3 overflow-auto">
          <RoutesList />
        </div>
        <div className="h-2/3">
          <Suspense fallback={<div>Google Map Loading</div>}>
            <MapView />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Home;
