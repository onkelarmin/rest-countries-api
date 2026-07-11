import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/Home/Home";
import { MainLayout } from "@/layouts/MainLayout";
import { homeLoader } from "./pages/Home/loader";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Home />, loader: homeLoader }],
  },
]);
