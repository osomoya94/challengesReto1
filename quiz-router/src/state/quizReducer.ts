import type { QuizAction, QuizState } from "./quizTypes";

export const initialState: QuizState = {
  currentIndex: 0,
  answers: [],
  finished: false,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ANSWER": {
      const exists = state.answers.some(
        (a) => a.questionId === action.payload.questionId,
      );
      const answers = exists
        ? state.answers.map((a) =>
            a.questionId === action.payload.questionId ? action.payload : a,
          )
        : [...state.answers, action.payload];

      return { ...state, answers };
    }

    case "NEXT":
      return { ...state, currentIndex: state.currentIndex + 1 };

    case "FINISH":
      return { ...state, finished: true };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}
