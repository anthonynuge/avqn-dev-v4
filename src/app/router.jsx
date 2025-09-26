import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import AppLayout from '@components/layout/AppLayout'
import { TransitionProvider } from '@/transition/TransitionProvider'

import Home from '@pages/home/Home'
const About = lazy(() => import('@pages/about/About'))
const ProjectIndex = lazy(() => import('@pages/projects/ProjectIndex'))
const ProjectDetail = lazy(() => import('@pages/projects/ProjectDetail'))

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
        path: 'about',
        element: <About />,
      },
    ],
  },
])
