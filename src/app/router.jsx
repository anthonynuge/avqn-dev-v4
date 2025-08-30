import { createBrowserRouter } from "react-router";

import AppLayout from "@components/layout/AppLayout";
import Home from "@pages/home/Home";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      // {
      //   path: "projects",
      //   element: <ProjectsLayout />,
      //   children: [
      //     { index: true, element: <ProjectsIndex /> },
      //     { path: ":slug", element: <ProjectDetail /> },
      //   ],
      // },
      // { path: "*", element: <NotFound /> },
    ],
  },
]);
