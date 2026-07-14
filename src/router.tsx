import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "@/pages/Home/Home";
import { MainLayout } from "@/layouts/MainLayout";
import { homeLoader } from "@/pages/Home/loader";
import { Country } from "@/pages/Country/Country";
import { countryLoader } from "@/pages/Country/loader";
import { NotFound } from "@/pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home />, loader: homeLoader },
      { path: "/countries", element: <Navigate to="/" /> },
      {
        path: "/countries/:countryCode",
        element: <Country />,
        loader: countryLoader,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
