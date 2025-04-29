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
      return activity.questions.map((question, index) => (
        <QuestionResult key={index} question={question} />
      ))
    }

    if (activity.type === 'round') {
      return activity.questions.map((rounds, index) => <RoundResult key={index} rounds={rounds} />)
    }

    return <p>Invalid activity type</p>
  }

  return (
    <div>
      <p>{activity.activity_name}</p>
      <p>Results</p>
      {renderResults()}
      <p onClick={() => navigate('../')}>Home</p>
    </div>
  )
}

function QuestionResult({ question }: { question: TQuestion }) {
  return (
    <p>
      Q{question.order}------
      {question.user_answers === question.is_correct ? 'CORRECT' : question.is_correct.toString()}
    </p>
  )
}

function RoundResult({ rounds }: { rounds: TQuestionRound }) {
  return (
    <div>
      <p>{rounds.round_title}</p>
      {rounds.questions.map((question, index) => (
        <QuestionResult question={question} key={index} />
      ))}
    </div>
  )
}

export default Result
