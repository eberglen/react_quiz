import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <Outlet />
    </div>
  )
}

export default Layout
