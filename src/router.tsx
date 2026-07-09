import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/Home";
import { MainLayout } from "@/layouts/MainLayout";

export const router = createBrowserRouter([
  { element: <MainLayout />, children: [{ path: "/", element: <Home /> }] },
]);
