import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import {
  getQuiz,
  selectIsFetched,
  selectQuiz,
  selectStatus,
  setActivityType,
  setQuestionId,
  setRoundId,
} from './quizSlice'
import { ActivityType } from './quizAPI'
import { NavLink, useNavigate } from 'react-router-dom'
import { checkActivityType, isQuestionRoundType, isQuestionType } from '../../lib/helpers'

export const Quiz = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(selectQuiz)
  const status = useAppSelector(selectStatus)
  const isFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (status === 'idle' && !isFetched) {
      console.log('hey')
      dispatch(getQuiz())
    }
  }, [dispatch])

  return (
    <div>
      <div>
        <p>{quiz?.name}</p>
        <p>{quiz?.heading}</p>
        <ul className="list-none">
          {quiz.activities.map((activity: ActivityType, index) => (
            <li key={index}>
              <ActivityLink activity={activity} activityId={index} />
            </li>
            // <div key={index} onClick={()=>}>{activity.activity_name}</div>
          ))}
        </ul>
        {/* <span>{JSON.stringify(quiz)}</span> */}
      </div>
    </div>
  )
}

const ActivityLink = ({ activity, activityId }: { activity: ActivityType; activityId: number }) => {
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
