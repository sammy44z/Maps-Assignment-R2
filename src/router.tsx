import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import DetailedView from "./components/DetailedView";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        }, {
          path: "detailed-view",
          element: <DetailedView />
        },
      ]
    },
  
  ])

  export default routes;