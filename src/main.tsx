import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Landing } from "./pages/Landing";
import "./output.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
