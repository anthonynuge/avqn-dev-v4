import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router'
import { ReactLenis } from 'lenis/react'
import { router } from './router'

import '@/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root>
      <RouterProvider router={router} />
    </ReactLenis>
  </StrictMode>,
)
