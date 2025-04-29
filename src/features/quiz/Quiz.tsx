import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import { getQuiz, selectIsFetched, selectQuiz, selectStatus, setUnfetch } from './quizSlice'
import { TActivity } from './quizAPI'
import { useNavigate } from 'react-router-dom'

export const Quiz = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(selectQuiz)
  const status = useAppSelector(selectStatus)
  const isFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (status === 'idle' && !isFetched) {
      dispatch(getQuiz())
    }
  }, [dispatch, status])

  const handleRefetch = () => {
    dispatch(setUnfetch())
    window.location.reload()
  }
  return (
    <div>
      <p>{quiz.name}</p>
      <p>{quiz.heading}</p>
      <ul className="list-none">
        {quiz.activities.map((activity: TActivity, index) => (
          <li key={index}>
            <ActivityLink activity={activity} activityId={index} />
          </li>
        ))}
      </ul>
      <p onClick={handleRefetch}>Refetch</p>
    </div>
  )
}

const ActivityLink = ({ activity, activityId }: { activity: TActivity; activityId: number }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (activity.is_completed) navigate(`../result/${activityId}`)
    else navigate(`../${activity.type}/${activityId}`)
  }

  return <div onClick={handleNavigate}>{activity.activity_name}</div>
}
