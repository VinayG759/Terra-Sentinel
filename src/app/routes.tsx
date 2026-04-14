import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./components/pages/Landing";
import { Dashboard } from "./components/pages/Dashboard";
import { Simulation } from "./components/pages/Simulation";
import { Response } from "./components/pages/Response";
import { Alerts } from "./components/pages/Alerts";
import { Settings } from "./components/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "dashboard", Component: Dashboard },
      { path: "simulation", Component: Simulation },
      { path: "response", Component: Response },
      { path: "alerts", Component: Alerts },
      { path: "settings", Component: Settings },
    ],
  },
]);
