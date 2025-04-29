import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Layout from './screens/Layout'
import Question from './screens/Question'
import Round from './screens/Round'
import Result from './screens/Result'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="question/:activityId" element={<Question />} />
            <Route path="round/:activityId" element={<Round />} />
            <Route path="result/:activityId" element={<Result />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
