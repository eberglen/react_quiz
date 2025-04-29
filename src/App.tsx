import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Activity from './screens/Activity'
import Layout from './Layout'
import Question from './screens/Question'
import Round from './screens/Round'
import Result from './screens/Result'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="question/:activityId" element={<Question />} />
          <Route path="round/:activityId" element={<Round />} />
          <Route path="result/:activityId" element={<Result />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

// quiz > question > result
// quiz > round > question > round > question > result

// different selectors
// different flow
export default App
