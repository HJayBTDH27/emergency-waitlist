import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import WaitList from "./components/WaitList";
import "../../css/triageLayout.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Record />,
      },
    ],
  },
  {
    path: "/admin/:id",
    element: <App />,
    children: [
      {
        path: "/admin/:id",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/wait",
    element: <App />,
    children: [
      {
        path: "/wait",
        element: <WaitList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
