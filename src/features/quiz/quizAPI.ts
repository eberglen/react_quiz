export type TQuiz = {
  name: string
  heading: string
  activities: TActivity[]
}

export type TQuestionActivity = {
  type: 'question'
  questions: TQuestion[]
}

export type TRoundActivity = {
  type: 'round'
  current_round: number
  questions: TQuestionRound[]
}

export type TActivity = {
  activity_name: string
  order: number
  current_question: number
  is_completed: boolean
} & (TQuestionActivity | TRoundActivity)

export type TQuestion = {
  is_correct: boolean
  stimulus: string
  order: number
  user_answers: [] | boolean
  feedback: string
}

export type TQuestionRound = {
  round_title: string
  order: number
  questions: TQuestion[]
}

export const fetchQuiz = (): Promise<TQuiz> =>
  // Temp solution for cors
  fetch(
    'https://corsproxy.io/https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json',
    {
      method: 'GET',
      mode: 'cors',
    }
  ).then((res) => res.json())
