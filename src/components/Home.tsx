import RoutesList from "./RoutesList";
import MapView from "./MapView";

function Home() {

    return (
        <>
        <div className="flex flex-col h-screen">
            <div className="h-1/3 overflow-auto">
              <RoutesList/>
            </div>
            <div className="h-2/3">
             {<MapView />}
            </div>
          </div>

        </>
          
    );
  }

  export default Home;