// A mock function to mimic making an async request for data
export type QuizType = {
  name: string
  heading: string
  activities: object[]
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
