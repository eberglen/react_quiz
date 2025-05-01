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
import Card from '../components/Card.tsx'

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

  const renderText = (text: string) => {
    const parts = text.split('*')
    return parts.map((part, index) => {
      if (index % 2 !== 0) {
        // Apply font-bold class to the parts between '*' (i.e., the bold part)
        return (
          <span key={index} className="font-bold">
            {part}
          </span>
        )
      } else {
        return part
      }
    })
  }

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
    <Card>
      <p className="italic text-xs">{activity.activity_name}</p>
      <div className="my-8">
        <div className="flex flex-row items-end justify-between">
          <p className="text-2xl">Q{questionDetails.order}</p>
          {activity.type === 'round' && (
            <p className="italic text-xs">Round {activity.current_round + 1}</p>
          )}
        </div>
        <hr className="h-px bg-gray-400 border-0" />
      </div>

      <div className="my-4">
        <p className="text-xl text-center">"{renderText(questionDetails.stimulus)}"</p>
      </div>
      <div className="flex divide-x mt-8 divide-gray-300">
        <button
          className="flex-grow py-3 hover:bg-gray-200 hover:cursor-pointer text-lg text-shadow-sm"
          onClick={() => handleAnswer(true)}
        >
          True
        </button>
        <button
          className="flex-grow py-3 hover:bg-gray-200 hover:cursor-pointer text-lg text-shadow-sm"
          onClick={() => handleAnswer(false)}
        >
          False
        </button>
      </div>
      <p>{questionDetails.user_answers}</p>
    </Card>
  )
}

export default Question
