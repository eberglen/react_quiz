import { Outlet } from 'react-router-dom'
import { Quiz } from '../features/quiz/Quiz'

function Home() {
  return (
    <div>
      <Quiz />
      <Outlet />
    </div>
  )
}

export default Home
