import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center text-gray-700">
      <Outlet />
    </div>
  )
}

export default Layout
