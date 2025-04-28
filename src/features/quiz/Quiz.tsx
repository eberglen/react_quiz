import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import { getQuiz, selectIsFetched, selectQuiz, selectStatus } from './quizSlice'
import { ActivityType } from './quizAPI'
import { NavLink } from 'react-router-dom'

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
              <NavLink to={`${index}/0`}>
                <span>{activity.activity_name}</span>
              </NavLink>
            </li>
            // <div key={index} onClick={()=>}>{activity.activity_name}</div>
          ))}
        </ul>
        {/* <span>{JSON.stringify(quiz)}</span> */}
      </div>
    </div>
  )
}
