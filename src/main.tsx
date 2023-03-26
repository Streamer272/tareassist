import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Add } from "./pages/Add";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import "./output.css";
import { CreateSchool } from "./pages/Create/School";
import { CreateClass } from "./pages/Create/Class";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create/school",
    element: <CreateSchool />,
  },
  {
    path: "/create/class",
    element: <CreateClass />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App>
    <RouterProvider router={router} />
  </App>
);
