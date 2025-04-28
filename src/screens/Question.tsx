import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectActivityType,
  selectCurrentQuestion,
  selectCurrentRound,
  selectQuestionByActivityId,
  selectQuestionsLength,
  selectRoundLength,
  setAnswer,
  setQuestionId,
  setRoundId,
} from '../features/quiz/quizSlice'

function Question() {
  const { activityId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const activityType = useAppSelector((state) => selectActivityType(state, Number(activityId)))
  const currentQuestion = useAppSelector((state) =>
    selectCurrentQuestion(state, Number(activityId))
  )
  const questionsLength = useAppSelector((state) =>
    selectQuestionsLength(state, Number(activityId))
  )

  const questionDetails = useAppSelector((state) =>
    selectQuestionByActivityId(state, Number(activityId))
  )

  const currentRound = useAppSelector((state) => selectCurrentRound(state, Number(activityId)))

  const roundLength = useAppSelector((state) => selectRoundLength(state, Number(activityId)))

  const handleAnswer = (user_answer: boolean) => {
    dispatch(setAnswer({ activityId: Number(activityId), user_answer }))
    // dispatch(setQuestionId({ activityId: Number(activityId), questionId: currentQuestion + 1 }))
    if (currentQuestion === undefined) return
    if (currentQuestion < questionsLength - 1) {
      console.log('Next Question')
      // proceed to next question
      dispatch(setQuestionId({ activityId: Number(activityId), questionId: currentQuestion + 1 }))
    } else if (activityType === 'question') {
      console.log('Question Result')
      // navigate to result
    } else if (activityType === 'round') {
      if (currentRound === roundLength - 1) {
        console.log('Round Result')
        // navigate to result
      } else {
        if (currentRound === undefined) return
        console.log('Next Round')
        // proceed to next round
        dispatch(setRoundId({ activityId: Number(activityId), roundId: currentRound + 1 }))
        dispatch(setQuestionId({ activityId: Number(activityId), questionId: 0 }))
        navigate(`../round/${activityId}`)
      }
    }
  }
  return (
    <div>
      Question
      <p>No. {questionDetails.order}</p>
      <p>{questionDetails.stimulus}</p>
      <p onClick={() => handleAnswer(true)}>True</p>
      <p onClick={() => handleAnswer(false)}>False</p>
      <p>{questionDetails.user_answers}</p>
    </div>
  )
}

export default Question
