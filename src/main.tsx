import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/main.scss";
import "lenis/dist/lenis.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router.tsx";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScroll>
      <RouterProvider router={router} />
    </SmoothScroll>
  </StrictMode>,
);
