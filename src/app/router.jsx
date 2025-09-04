import { createBrowserRouter } from 'react-router'

import AppLayout from '@components/layout/AppLayout'
import Home from '@pages/home/Home'
import ProjectIndex from '@pages/projects/ProjectIndex'
import ProjectDetail from '@pages/projects/ProjectDetail'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'projects',
        element: <ProjectIndex />,
      },
      {
        path: 'projects/:projectSlug',
        element: <ProjectDetail />,
      },
      // { path: "*", element: <NotFound /> },
    ],
  },
])
