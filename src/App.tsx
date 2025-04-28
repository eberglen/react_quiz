import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Activity from './screens/Activity'
import Layout from './Layout'
import Question from './screens/Question'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":activityId" element={<Activity />}>
            <Route path=":roundId?/:questionId" element={<Question />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
