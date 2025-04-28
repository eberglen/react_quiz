import { Outlet, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectQuestionByActivityId } from '../features/quiz/quizSlice'

function Activity() {
  const { activityId, questiondId } = useParams()
  const questionDetails = useAppSelector((state) =>
    selectQuestionByActivityId(state, Number(activityId))
  )

  return (
    <div>
      Activity
      {/* {JSON.stringify(questionDetails)} */}
      <p>{questiondId}</p>
    </div>
  )
}

export default Activity
