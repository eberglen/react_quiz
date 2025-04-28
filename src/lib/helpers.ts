import { QuestionRoundType, QuestionType } from '../features/quiz/quizAPI'

// export const getActivityType = (questions: QuestionRoundType[] | QuestionType[]): string => {
//   if (questions.length < 1) return 'error?noQuestions'

//   switch (checkActivityType(questions[0])) {
//     case 'round':
//       return 'round'
//     case 'question':
//       return 'question'
//     default:
//       return 'error?invalidActivityType'
//   }
// }

export const checkActivityType = (
  questions: QuestionRoundType[] | QuestionType[]
): 'round' | 'question' | undefined => {
  if (questions.length < 1) return
  const question = questions[0]
  if ('round_title' in question) return 'round'
  if ('stimulus' in question) return 'question'
}
