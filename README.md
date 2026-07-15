# REST Countries Explorer

A responsive country explorer that allows users to browse countries from around the world, search by name, filter by region, and view detailed information for each country.

Built as part of a Frontend Mentor challenge, this project focuses on learning React Router's Data APIs and working with asynchronous data in modern React applications. Unlike my previous React project, this application consumes a real-world REST API and demonstrates route-based data loading, deferred rendering, and robust error handling.

Throughout the project I also explored React Router's data loading model, learning how loaders, deferred promises, Suspense, and route-level error boundaries can simplify asynchronous application architecture while improving the user experience.

---

## Technologies used

- React
- React Router
- Vite
- TypeScript
- SCSS Modules
- Zod
- Vitest
- React Testing Library
- User Event
- REST Countries API

---

## Features

- Browse all countries
- Search countries by name
- Filter countries by region
- View detailed country information
- Navigate between bordering countries
- Skeleton loading states
- Route-based data loading
- Theme switching with persisted preference
- Respects `prefers-reduced-motion`
- Accessible semantic markup
- Fully responsive design

---

## Implementation Highlights

### React Router Data APIs

Application data is loaded through React Router loaders rather than inside components.

This keeps data requirements colocated with their routes while allowing React Router to coordinate loading, error handling, and navigation.

### Deferred Route Rendering

Rather than awaiting loader data before rendering a route, unresolved promises are returned from the loaders and resolved inside the route using `Suspense` and `Await`.

This allows navigation to occur immediately while skeleton components provide visual feedback until the requested data has been loaded.

### API Validation

All external API responses are validated using Zod before entering the application.

This ensures that only correctly shaped data is consumed throughout the application while protecting against unexpected or incomplete API responses.

### Reusable Design System

The application continues to use my custom Sass design system as the foundation for styling. Design tokens are defined using Sass maps and compiled into CSS custom properties, providing a consistent and scalable approach to spacing, typography, colours, sizing, and layout.

The design system continues evolving alongside my React projects while remaining reusable across future applications.

### Testing

The application includes:

- Unit tests for API data handling
- Component tests for reusable UI components
- Integration tests covering the primary user flows including searching, filtering, routing, and navigation

The tests focus on user behaviour using React Testing Library and User Event while keeping individual business logic independently verified.

---

## What I've learned

- Building applications using React Router's Data APIs
- Loading route data using loaders instead of `useEffect`
- Deferring loader promises and resolving them with `Suspense` and `Await`
- Working with a real-world REST API in React
- Validating external API responses using Zod
- Designing skeleton loading states to improve perceived performance
- Handling route-level errors using React Router error boundaries
- Continuing to expand my React testing skills using Vitest and React Testing Library

---

## Live Demo

https://...

---

## Preview

...
