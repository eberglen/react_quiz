import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectQuestionByIndex } from '../features/quiz/quizSlice'

type QuestionParams = {
  activityId: string
  questionId: string
}

function Question() {
  const { activityId, questionId } = useParams<QuestionParams>()
  const questionDetails = useAppSelector((state) =>
    selectQuestionByIndex(state, Number(activityId), Number(questionId))
  )

  return <div>{JSON.stringify(questionDetails)}</div>
}

export default Question
