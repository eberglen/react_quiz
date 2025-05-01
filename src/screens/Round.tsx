import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentRound, selectRounds } from '../features/quiz/quizSlice'
import { motion } from 'framer-motion'

function Round() {
  const { activityId } = useParams()
  const activityIdNum = Number(activityId)

  const navigate = useNavigate()
  const currentRound = useAppSelector((state) => selectCurrentRound(state, activityIdNum))
  const rounds = useAppSelector((state) => selectRounds(state, activityIdNum))

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`../question/${activityId}`)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [navigate, activityId])

  return (
    <motion.div
      className="text-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {rounds[currentRound].round_title}
    </motion.div>
  )
}

export default Round
