export type Difficulty = "any" | "easy" | "medium" | "hard";

export type QuizConfig = {
  amount: number;
  difficulty: Difficulty;
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type QuizAnswer = {
  questionId: string;
  selectedIndex: number;
};

export type QuizStatus = "idle" | "loading" | "ready" | "error";

export type QuizState = {
  config: QuizConfig;
  status: QuizStatus;
  error: string | null;

  questions: Question[];
  currentIndex: number;
  answers: QuizAnswer[];
  finished: boolean;
};

export type QuizAction =
  | { type: "SET_CONFIG"; payload: QuizConfig }
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Question[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ANSWER"; payload: QuizAnswer }
  | { type: "NEXT" }
  | { type: "FINISH" }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: QuizState };