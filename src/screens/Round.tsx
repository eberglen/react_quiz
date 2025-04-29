import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentRound, selectRounds } from '../features/quiz/quizSlice'

function Round() {
  const { activityId } = useParams()
  const activityIdNum = Number(activityId)

  const navigate = useNavigate()
  const currentRound = useAppSelector((state) => selectCurrentRound(state, activityIdNum))
  const rounds = useAppSelector((state) => selectRounds(state, activityIdNum))

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`../question/${activityId}`)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [navigate])

  return <div>{rounds[currentRound].round_title}</div>
}

export default Round
