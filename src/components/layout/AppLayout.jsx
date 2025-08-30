import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

function AppLayout() {
  return (
    <>
      <div className="mx-auto grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <Navbar />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default AppLayout
