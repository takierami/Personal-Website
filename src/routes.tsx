import * as React from "react";
import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";

const HomePage = React.lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const ExperiencePage = React.lazy(() => import("./pages/ExperiencePage").then(m => ({ default: m.ExperiencePage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const NotFound = React.lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

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
