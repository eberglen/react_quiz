import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectQuiz } from '../features/quiz/quizSlice'

const ProtectedRoute = () => {
  const { activityId } = useParams()
  const location = useLocation()
  const quiz = useAppSelector(selectQuiz)
  const activityIdNum = Number(activityId)
  const isValidId =
    !isNaN(activityIdNum) &&
    activityIdNum >= 0 &&
    activityIdNum <= quiz.activities.length - 1 &&
    Number.isInteger(activityIdNum)

  if (!isValidId) return <Navigate to="/" />

  if (location.pathname.startsWith('/result')) {
    const is_complete = quiz.activities[activityIdNum].is_completed
    if (!is_complete) return <Navigate to="/" />
  }

  if (location.pathname.startsWith('/question') || location.pathname.startsWith('/round')) {
    const is_complete = quiz.activities[activityIdNum].is_completed
    if (is_complete) return <Navigate to={`/result/${activityId}`} />
  }

  if (location.pathname.startsWith('/round')) {
    const type = quiz.activities[activityIdNum].type
    if (type !== 'round') return <Navigate to="/" />
  }

  return <Outlet />
}

export default ProtectedRoute
