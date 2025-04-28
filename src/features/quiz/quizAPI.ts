export type QuizType = {
  name: string
  heading: string
  activities: ActivityType[]
}

export type ActivityType = {
  activity_name: string
  order: number
  questions: QuestionType[] | QuestionRoundType[]
  current_question?: number
  current_round?: number
  type?: 'round' | 'question' | undefined //TODO: create separate type
}

export type QuestionType = {
  is_correct: boolean
  stimulus: string
  order: number
  user_answers: [] | boolean
  feedback: string
}

export type QuestionRoundType = {
  round_title: string
  order: number
  questions: QuestionType[]
}

export const fetchQuiz = (): Promise<QuizType> =>
  // Temp solution for cors
  fetch(
    'https://corsproxy.io/https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json',
    {
      method: 'GET',
      mode: 'cors',
    }
  ).then((res) => res.json())
