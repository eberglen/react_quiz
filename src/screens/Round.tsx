import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentRound, selectRounds } from '../features/quiz/quizSlice'

function Round() {
  const navigate = useNavigate()
  const { activityId } = useParams()
  const currentRound = useAppSelector((state) => selectCurrentRound(state, Number(activityId)))
  const rounds = useAppSelector((state) => selectRounds(state, Number(activityId)))

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`../question/${activityId}`)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div>{currentRound === undefined ? 'Invalid Round' : rounds[currentRound].round_title}</div>
  )
}

export default Round
