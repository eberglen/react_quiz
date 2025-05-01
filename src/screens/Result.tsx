import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectActivity } from '../features/quiz/quizSlice'
import { TQuestionRound, TQuestion } from '../features/quiz/quizAPI'

function Result() {
  const { activityId } = useParams()
  const activityIdNum = Number(activityId)

  const activity = useAppSelector((state) => selectActivity(state, activityIdNum))
  const navigate = useNavigate()

  const renderResults = () => {
    if (activity.type === 'question') {
      return (
        <div className="flex flex-col divide-y divide-gray-300 gap-3">
          {activity.questions.map((question, index) => (
            <QuestionResult key={index} question={question} />
          ))}
        </div>
      )
    }

    if (activity.type === 'round') {
      return (
        <div className="flex flex-col gap-3">
          {activity.questions.map((rounds, index) => (
            <RoundResult key={index} rounds={rounds} />
          ))}
        </div>
      )
    }

    return <p>Invalid activity type</p>
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-md shadow-sm m-6 min-w-1/3">
      <p className="text-lg">{activity.activity_name}</p>
      <p className="text-gray-500 text-sm">Results</p>
      <div className="min-w-full">{renderResults()}</div>
      <button
        className="mt-4 w-full hover:bg-gray-200 hover:cursor-pointer rounded-md p-2"
        onClick={() => navigate('../')}
      >
        Home
      </button>
    </div>
  )
}

function QuestionResult({ question }: Readonly<{ question: TQuestion }>) {
  return (
    <div className="flex flex-row justify-between">
      <span>Q{question.order}</span>
      <span>
        {question.user_answers === question.is_correct ? 'CORRECT' : question.is_correct.toString()}
      </span>
    </div>
  )
}

function RoundResult({ rounds }: Readonly<{ rounds: TQuestionRound }>) {
  return (
    <div className="">
      <p className="text-sm text-gray-500">{rounds.round_title}</p>
      <div className="flex flex-col divide-y divide-gray-300 gap-3">
        {rounds.questions.map((question, index) => (
          <QuestionResult question={question} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Result
