import * as React from 'react'

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-gray-50 p-6 rounded-md shadow-sm min-w-3/4 m-6">{children}</div>
}

export default Card
