import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchQuiz, QuestionRound, Question, QuizType, ActivityType } from './quizAPI'
import { RootState } from '../../app/store'
import { isListQuestionRoundType, isListQuestionType } from '../../lib/helpers'

export interface QuizState {
  value: QuizType
  status: 'idle' | 'loading' | 'failed'
}

export type QuestionPayload = {
  activityId: number
  questionId: number
}

export type RoundPayload = {
  activityId: number
  roundId: number
}

export type AnswerPayload = {
  activityId: number
  user_answer: boolean
}

export type ActivityTypePayload = {
  activityId: number
  type: ActivityType
}

const initialState: QuizState = {
  value: { name: '', heading: '', activities: [] },
  status: 'idle',
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<QuestionPayload>) => {
      const { activityId, questionId } = action.payload
      state.value.activities[activityId].current_question = questionId
    },
    setRoundId: (state, action: PayloadAction<RoundPayload>) => {
      const { activityId, roundId } = action.payload
      state.value.activities[activityId].current_round = roundId
    },
    setAnswer: (state, action: PayloadAction<AnswerPayload>) => {
      const { activityId, user_answer } = action.payload
      const question = getQuestionFromActivity(state, activityId)
      if (question) question.user_answers = user_answer
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(getQuiz.rejected, (state, action) => {
        console.error(action.error)
        state.status = 'failed'
      })
  },
})

export const { setQuestionId, setRoundId, setAnswer } = quizSlice.actions

export default quizSlice.reducer

export const selectQuiz = (state: RootState) => state.quiz.value
export const selectStatus = (state: RootState) => state.quiz.status
export const selectIsFetched = (state: RootState) => state.quiz.value.name
export const selectQuestion = (state: RootState, activityId: number): Question | undefined =>
  getQuestionFromActivity(state.quiz, activityId)

export const selectQuestions = (state: RootState, activityId: number): Question[] | [] =>
  getQuestionsFromActivity(state.quiz, activityId) || []

export const selectRounds = (state: RootState, activityId: number): QuestionRound[] => {
  const rounds = state.quiz.value.activities[activityId].questions as QuestionRound[]
  return rounds
}

export const selectCurrentQuestion = (state: RootState, activityId: number): number =>
  state.quiz.value.activities[activityId].current_question ?? -1

export const selectCurrentRound = (state: RootState, activityId: number): number =>
  state.quiz.value.activities[activityId].current_round ?? -1

const getQuestionFromActivity = (state: QuizState, activityId: number): Question | undefined => {
  const questions = getQuestionsFromActivity(state, activityId)
  const currentQuestion = state.value.activities?.[activityId]?.current_question
  if (currentQuestion === undefined || questions === undefined) return
  return questions[currentQuestion]
}

const getQuestionsFromActivity = (state: QuizState, activityId: number): Question[] | undefined => {
  const activity = state.value.activities?.[activityId]

  if (isListQuestionType(activity.questions)) {
    return activity.questions
  } else if (isListQuestionRoundType(activity.questions)) {
    const currentRound = activity?.current_round
    if (currentRound === undefined) return
    const round = activity.questions[currentRound]
    return round.questions
  }
}

export const getQuiz = createAsyncThunk('quiz/fetchQuiz', async () => {
  const response = await fetchQuiz()
  return response
})
