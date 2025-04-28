import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'
import { getQuiz, selectIsFetched, selectQuiz, selectStatus } from './quizSlice'

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
        <span>{JSON.stringify(quiz)}</span>
      </div>
    </div>
  )
}
