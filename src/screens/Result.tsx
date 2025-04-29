import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectRounds } from '../features/quiz/quizSlice'
import { QuestionRoundType, QuestionType } from '../features/quiz/quizAPI'
import { isQuestionRoundType, isQuestionType } from '../lib/helpers'

function Result() {
  const { activityId } = useParams()
  const rounds = useAppSelector((state) => selectRounds(state, Number(activityId)))
  const navigate = useNavigate()
  return (
    <div>
      {rounds.map((round: QuestionType | QuestionRoundType, index) => {
        if (isQuestionType(round)) {
          return <QuestionResult question={round} key={index} />
        } else if (isQuestionRoundType(round)) {
          return <RoundResult rounds={round} key={index} />
        }
      })}
      <p onClick={() => navigate('../')}>Home</p>
    </div>
  )
}

function QuestionResult({ question }: { question: QuestionType }) {
  return (
    <p>
      Q{question.order}------
      {question.user_answers === question.is_correct ? 'CORRECT' : question.is_correct.toString()}
    </p>
  )
}

function RoundResult({ rounds }: { rounds: QuestionRoundType }) {
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
