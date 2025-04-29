import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectCurrentQuestion,
  selectCurrentRound,
  selectQuestion,
  selectQuestions,
  selectQuiz,
  selectRounds,
  setAnswer,
  setQuestionId,
  setRoundId,
} from '../features/quiz/quizSlice'
import { isListQuestionRoundType, isListQuestionType } from '../lib/helpers'

function Question() {
  const { activityId } = useParams()
  const questionDetails = useAppSelector((state) => selectQuestion(state, Number(activityId)))

  if (questionDetails === undefined) return <Navigate to="/" />

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const quiz = useAppSelector(selectQuiz)
  const currentQuestion = useAppSelector((state) =>
    selectCurrentQuestion(state, Number(activityId))
  )
  const questions = useAppSelector((state) => selectQuestions(state, Number(activityId)))
  const currentRound = useAppSelector((state) => selectCurrentRound(state, Number(activityId)))
  const rounds = useAppSelector((state) => selectRounds(state, Number(activityId)))

  const handleAnswer = (user_answer: boolean) => {
    dispatch(setAnswer({ activityId: Number(activityId), user_answer }))
    const isLastQuestion = currentQuestion === questions.length - 1

    if (isLastQuestion) {
      const questions = quiz.activities[Number(activityId)].questions
      if (isListQuestionType(questions)) {
        // navigate to result
        navigate(`../result/${activityId}`)
      } else if (isListQuestionRoundType(questions)) {
        const isLastRound = currentRound === rounds.length - 1
        if (isLastRound) {
          // navigate to result
          navigate(`../result/${activityId}`)
        } else {
          // proceed to next round
          dispatch(setRoundId({ activityId: Number(activityId), roundId: currentRound + 1 }))
          dispatch(setQuestionId({ activityId: Number(activityId), questionId: 0 }))
          navigate(`../round/${activityId}`)
        }
      }
    } else {
      // proceed to next question
      dispatch(setQuestionId({ activityId: Number(activityId), questionId: currentQuestion + 1 }))
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
