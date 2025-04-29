import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchQuiz, TQuestionRound, TQuestion, TQuiz, TActivity } from './quizAPI'
import { RootState } from '../../app/store'

export interface QuizState {
  value: TQuiz
  status: 'idle' | 'loading' | 'failed'
  isFetched: Boolean
}

export type AnswerPayload = {
  activityId: number
  user_answer: boolean
}

const initialState: QuizState = {
  value: { name: '', heading: '', activities: [] },
  status: 'idle',
  isFetched: false,
}

export const getQuiz = createAsyncThunk('quiz/fetchQuiz', async () => {
  const response = await fetchQuiz()
  return response
})

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setComplete: (state, action: PayloadAction<number>) => {
      const activityId = action.payload
      state.value.activities[activityId].is_completed = true
    },
    setNextQuestion: (state, action: PayloadAction<number>) => {
      const activityId = action.payload
      state.value.activities[activityId].current_question += 1
    },
    setNextRound: (state, action: PayloadAction<number>) => {
      const activityId = action.payload
      const activity = state.value.activities[activityId]
      if (activity.type === 'round') {
        activity.current_round += 1
        activity.current_question = 0
      }
    },
    setAnswer: (state, action: PayloadAction<AnswerPayload>) => {
      const { activityId, user_answer } = action.payload
      const question = getQuestionFromActivity(state, activityId)
      if (question) question.user_answers = user_answer
    },
    setUnfetch: (state) => {
      state.isFetched = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = {
          ...action.payload,
          activities: action.payload.activities.map(transformActivity),
        }
        state.isFetched = true
      })
      .addCase(getQuiz.rejected, (state, action) => {
        console.error(action.error)
        state.status = 'failed'
      })
  },
})

export const { setNextQuestion, setNextRound, setAnswer, setUnfetch, setComplete } =
  quizSlice.actions

export default quizSlice.reducer

export const selectQuiz = (state: RootState) => state.quiz.value
export const selectStatus = (state: RootState) => state.quiz.status
export const selectIsFetched = (state: RootState) => state.quiz.isFetched
export const selectQuestion = (state: RootState, activityId: number): TQuestion =>
  getQuestionFromActivity(state.quiz, activityId)

export const selectQuestions = (state: RootState, activityId: number): TQuestion[] | [] =>
  getQuestionsFromActivity(state.quiz, activityId) || []

export const selectRounds = (state: RootState, activityId: number): TQuestionRound[] => {
  const rounds = state.quiz.value.activities[activityId].questions as TQuestionRound[]
  return rounds
}

export const selectActivity = (state: RootState, activityId: number): TActivity =>
  state.quiz.value.activities[activityId]

export const selectCurrentQuestion = (state: RootState, activityId: number): number =>
  state.quiz.value.activities[activityId].current_question

export const selectCurrentRound = (state: RootState, activityId: number): number =>
  state.quiz.value.activities[activityId].type === 'round'
    ? state.quiz.value.activities[activityId].current_round
    : -1

const getQuestionFromActivity = (state: QuizState, activityId: number): TQuestion => {
  const questions = getQuestionsFromActivity(state, activityId)
  const currentQuestion = state.value.activities?.[activityId]?.current_question
  return questions[currentQuestion]
}

const getQuestionsFromActivity = (state: QuizState, activityId: number): TQuestion[] => {
  const activity = state.value.activities?.[activityId]

  if (activity.type === 'question') {
    return activity.questions
  } else if (activity.type === 'round') {
    const currentRound = activity.current_round
    const round = activity.questions[currentRound]
    return round.questions
  }
  return []
}

const transformActivity = (activity: TActivity): TActivity => {
  if (isListQuestionRoundType(activity.questions)) {
    return {
      ...activity,
      type: 'round',
      current_question: 0,
      is_completed: false,
      current_round: 0,
      questions: activity.questions,
    }
  } else if (isListQuestionType(activity.questions)) {
    return {
      ...activity,
      type: 'question',
      current_question: 0,
      is_completed: false,
      questions: activity.questions,
    }
  } else {
    return activity
  }
}

export const isListQuestionRoundType = (
  questions: TQuestion[] | TQuestionRound[]
): questions is TQuestionRound[] => {
  return questions.length > 0 && 'round_title' in questions[0]
}

export const isListQuestionType = (
  questions: TQuestion[] | TQuestionRound[]
): questions is TQuestion[] => {
  return questions.length > 0 && 'stimulus' in questions[0]
}
