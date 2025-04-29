import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectActivity,
  selectCurrentQuestion,
  selectCurrentRound,
  selectQuestion,
  selectQuestions,
  selectRounds,
  setAnswer,
  setComplete,
  setNextQuestion,
  setNextRound,
} from '../features/quiz/quizSlice'

function Question() {
  const { activityId } = useParams()
  const activityIdNum = Number(activityId)

  const questionDetails = useAppSelector((state) => selectQuestion(state, activityIdNum))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const activity = useAppSelector((state) => selectActivity(state, activityIdNum))
  const currentQuestion = useAppSelector((state) => selectCurrentQuestion(state, activityIdNum))
  const questions = useAppSelector((state) => selectQuestions(state, activityIdNum))
  const currentRound = useAppSelector((state) => selectCurrentRound(state, activityIdNum))
  const rounds = useAppSelector((state) => selectRounds(state, activityIdNum))

  const handleAnswer = (user_answer: boolean) => {
    dispatch(setAnswer({ activityId: activityIdNum, user_answer }))
    const isLastQuestion = currentQuestion === questions.length - 1

    if (isLastQuestion) {
      if (activity.type === 'question') {
        // navigate to result
        dispatch(setComplete(activityIdNum))
        navigate(`../result/${activityId}`)
      } else if (activity.type === 'round') {
        const isLastRound = currentRound === rounds.length - 1
        if (isLastRound) {
          // navigate to result
          dispatch(setComplete(activityIdNum))
          navigate(`../result/${activityId}`)
        } else {
          // proceed to next round
          dispatch(setNextRound(activityIdNum))
          navigate(`../round/${activityId}`)
        }
      }
    } else {
      // proceed to next question
      dispatch(setNextQuestion(activityIdNum))
    }
  }
  return (
    <div>
      Question
      <p>No. {questionDetails.order}</p>
      <p>{questionDetails.stimulus}</p>
      <button onClick={() => handleAnswer(true)}>True</button>
      <button onClick={() => handleAnswer(false)}>False</button>
      <p>{questionDetails.user_answers}</p>
    </div>
  )
}

export default Question
