import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import { getQuiz, selectIsFetched, selectQuiz, selectStatus, setUnfetch } from './quizSlice'
import { TActivity } from './quizAPI'
import { useNavigate } from 'react-router-dom'
import refreshIcon from '../../assets/refresh.svg'

export const Quiz = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(selectQuiz)
  const status = useAppSelector(selectStatus)
  const isFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (status === 'idle' && !isFetched) {
      dispatch(getQuiz())
    }
  }, [dispatch, status, isFetched])

  const handleRefetch = () => {
    dispatch(setUnfetch())
  }

  if (status === 'loading')
    return (
      <div className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      </div>
    )

  if (status === 'failed')
    return (
      <div className="flex flex-row items-center flex-grow gap-1">
        Cannot load quiz. Please click
        <button className="text-blue-500" onClick={handleRefetch}>
          Refresh
        </button>
      </div>
    )

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="mb-4">
          <p className="text-3xl">{quiz.name}</p>
          <p className="text-sm text-gray-500">{quiz.heading}</p>
        </div>
        <button onClick={handleRefetch}>
          <img
            src={refreshIcon}
            className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200"
            alt="refresh"
          />
        </button>
      </div>
      <div className="divide-y divide-gray-300">
        {quiz.activities.map((activity: TActivity, index) => (
          <div key={activity.order}>
            <ActivityLink activity={activity} activityId={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ActivityLink = ({ activity, activityId }: { activity: TActivity; activityId: number }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (activity.is_completed) navigate(`../result/${activityId}`)
    else navigate(`../${activity.type}/${activityId}`)
  }

  const renderStatus = () => {
    if (activity.is_completed) {
      return (
        <div className="flex flex-row gap-2 italic text-xs">
          <span className="text-gray-500">Status</span>
          <span className="text-gray-400">Completed</span>
        </div>
      )
    }
    if (activity.type === 'question' && activity.current_question > 0) {
      return (
        <div className="flex flex-row gap-2 italic text-xs">
          <span className="text-gray-500">Status</span>
          <span className="text-gray-400">Question: {activity.current_question + 1}</span>
        </div>
      )
    }
    if (
      activity.type === 'round' &&
      (activity.current_question > 0 || activity.current_round > 0)
    ) {
      return (
        <div className="flex flex-row gap-2 italic text-xs">
          <span className="text-gray-500">Status</span>
          <span className="text-gray-400">Round: {activity.current_round + 1}</span>
          <span className="text-gray-400">Question: {activity.current_question + 1}</span>
        </div>
      )
    }

    return (
      <div className="flex flex-row gap-2 italic text-xs">
        <span className="text-gray-500">Status</span>
        <span className="text-gray-400">Unstarted</span>
      </div>
    )
  }

  return (
    <button
      className="w-full hover:bg-gray-200 hover:cursor-pointer rounded-md"
      onClick={handleNavigate}
    >
      <div className="p-2 ">
        <p className="text-start">{activity.activity_name}</p>
        {renderStatus()}
      </div>
    </button>
  )
}
