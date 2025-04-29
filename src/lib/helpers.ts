import { QuestionRound, Question } from '../features/quiz/quizAPI'

export const isQuestionRoundType = (
  question: Question | QuestionRound
): question is QuestionRound => {
  return 'round_title' in question
}

export const isListQuestionRoundType = (
  questions: Question[] | QuestionRound[]
): questions is QuestionRound[] => {
  return questions.length > 0 && 'round_title' in questions[0]
}

export const isQuestionType = (question: Question | QuestionRound): question is Question => {
  return 'stimulus' in question
}

export const isListQuestionType = (
  questions: Question[] | QuestionRound[]
): questions is Question[] => {
  return questions.length > 0 && 'stimulus' in questions[0]
}
