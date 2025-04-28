import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Question from './screens/Question'
import Layout from './Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":activityId">
            <Route path=":questionId" element={<Question />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
