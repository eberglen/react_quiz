import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import {
  getQuiz,
  selectIsFetched,
  selectQuiz,
  selectStatus,
  setQuestionId,
  setRoundId,
} from './quizSlice'
import { Activity } from './quizAPI'
import { useNavigate } from 'react-router-dom'
import { isQuestionRoundType, isQuestionType } from '../../lib/helpers'

export const Quiz = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(selectQuiz)
  const status = useAppSelector(selectStatus)
  const isFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (status === 'idle' && !isFetched) {
      dispatch(getQuiz())
    }
  }, [dispatch])

  return (
    <div>
      <div>
        <p>{quiz?.name}</p>
        <p>{quiz?.heading}</p>
        <ul className="list-none">
          {quiz.activities.map((activity: Activity, index) => (
            <li key={index}>
              <ActivityLink activity={activity} activityId={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const ActivityLink = ({ activity, activityId }: { activity: Activity; activityId: number }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigate = () => {
    if (activity.questions.length < 1) {
      alert('No Questions')
      return
    }
    const questionOrRound = activity.questions[0]
    if (isQuestionRoundType(questionOrRound)) {
      dispatch(setRoundId({ activityId, roundId: 0 }))
      dispatch(setQuestionId({ activityId, questionId: 0 }))
      navigate(`../round/${activityId}`)
    } else if (isQuestionType(questionOrRound)) {
      dispatch(setQuestionId({ activityId, questionId: 0 }))
      navigate(`../question/${activityId}`)
    } else {
      alert('Question Type is not defined')
    }
  }

  return <div onClick={handleNavigate}>{activity.activity_name}</div>
}
