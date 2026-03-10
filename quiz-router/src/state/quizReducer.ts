import type { QuizAction, QuizState } from "./quizTypes";

export const initialState: QuizState = {
  config: { amount: 5, difficulty: "any" },
  status: "idle",
  error: null,

  questions: [],
  currentIndex: 0,
  answers: [],
  finished: false,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "SET_CONFIG":
      return { ...state, config: action.payload };

    case "LOAD_START":
      return {
        ...state,
        status: "loading",
        error: null,
        questions: [],
        currentIndex: 0,
        answers: [],
        finished: false,
      };

    case "LOAD_SUCCESS":
      return {
        ...state,
        status: "ready",
        error: null,
        questions: action.payload,
        currentIndex: 0,
        answers: [],
        finished: false,
      };

    case "LOAD_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
        questions: [],
      };

    case "ANSWER": {
      const exists = state.answers.some((a) => a.questionId === action.payload.questionId);
      const answers = exists
        ? state.answers.map((a) => (a.questionId === action.payload.questionId ? action.payload : a))
        : [...state.answers, action.payload];

      return { ...state, answers };
    }

    case "NEXT":
      return { ...state, currentIndex: state.currentIndex + 1 };

    case "FINISH":
      return { ...state, finished: true };

    // Reinicia el progreso pero NO borra preguntas (sirve para “reintentar” el mismo set)
    case "RESTART":
      return { ...state, currentIndex: 0, answers: [], finished: false };

    default:
      return state;
  }
}