export type QuizAnswer = {
  questionId: string;
  selectedIndex: number;
};

export type QuizState = {
  currentIndex: number;
  answers: QuizAnswer[];
  finished: boolean;
};

export type QuizAction =
  | { type: "ANSWER"; payload: QuizAnswer }
  | { type: "NEXT" }
  | { type: "FINISH" }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: QuizState };
