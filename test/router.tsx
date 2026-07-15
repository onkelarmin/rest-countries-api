import {
  createMemoryRouter,
  RouterProvider,
  type LoaderFunction,
} from "react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

type RenderRouteOptions = {
  routes: {
    path: string;
    element: ReactNode;
    loader: LoaderFunction;
  }[];
  initialEntries?: string[];
};

export function renderRoute({
  routes,
  initialEntries = ["/"],
}: RenderRouteOptions) {
  const router = createMemoryRouter(routes, { initialEntries });

  return render(<RouterProvider router={router} />);
}
