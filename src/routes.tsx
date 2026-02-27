import * as React from "react";
import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
