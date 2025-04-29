export type QuizType = {
  name: string
  heading: string
  activities: Activity[]
}

export type Activity = {
  activity_name: string
  order: number
  questions: Question[] | QuestionRound[]
  current_question?: number
  current_round?: number
}

export type Question = {
  is_correct: boolean
  stimulus: string
  order: number
  user_answers: [] | boolean
  feedback: string
}

export type QuestionRound = {
  round_title: string
  order: number
  questions: Question[]
}

export type ActivityType = 'round' | 'question' | undefined

export const fetchQuiz = (): Promise<QuizType> =>
  // Temp solution for cors
  fetch(
    'https://corsproxy.io/https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json',
    {
      method: 'GET',
      mode: 'cors',
    }
  ).then((res) => res.json())
