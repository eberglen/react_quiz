import { Outlet, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectQuestionByIndex } from '../features/quiz/quizSlice'

function Activity() {
  const { activityId, questiondId } = useParams()
  const questionDetails = useAppSelector((state) =>
    selectQuestionByIndex(state, Number(activityId))
  )

  return (
    <div>
      Activity
      {/* {JSON.stringify(questionDetails)} */}
      <p>{questiondId}</p>
      <Outlet />
    </div>
  )
}

export default Activity
