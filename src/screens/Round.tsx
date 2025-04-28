import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentRound } from '../features/quiz/quizSlice'

function Round() {
  const navigate = useNavigate()
  const { activityId } = useParams()
  const currentRound = useAppSelector((state) => selectCurrentRound(state, Number(activityId)))

  useEffect(() => {
    setTimeout(() => {
      navigate(`../question/${activityId}`)
    }, 2000)
  }, [navigate])

  return <div>Round {currentRound === undefined ? 'Invalid Round' : currentRound + 1}</div>
}

export default Round
