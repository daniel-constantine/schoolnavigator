import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RecommendationPage from "./pages/RecommendationPage";
import MapPage from "./pages/MapPage";
import SchoolPage from "./pages/SchoolPage";
import ComparePage from "./pages/ComparePage/ComparePage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: "recommendation",
      //   element: <RecommendationPage />,
      // },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "school/:dbn",
        element: <SchoolPage />,
      },
      {
        path: "compare",
        element: <ComparePage />,
      },
    ],
  },
]);
