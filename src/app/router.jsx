import { createBrowserRouter } from 'react-router'

import AppLayout from '@components/layout/AppLayout'
import Home from '@pages/home/Home'
import ProjectIndex from '@pages/projects/ProjectIndex'
import ProjectDetail from '@pages/projects/ProjectDetail'
import Test from '@pages/test/test'
import About from '@pages/about/About'
import { TransitionProvider } from '@/transition/TransitionProvider'

export const router = createBrowserRouter([
  {
    element: (
      <TransitionProvider>
        <AppLayout />
      </TransitionProvider>
    ),
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
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'about',
        element: <About />,
      },
      // { path: "*", element: <NotFound /> },
    ],
  },
])
