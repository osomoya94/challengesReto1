import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { loadJSON, saveJSON } from "../hooks/storage";
import { initialState, quizReducer } from "./quizReducer";
import type { QuizAction, QuizState } from "./quizTypes";

const KEY = "quizState.v2";

type QuizContextValue = {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    quizReducer,
    initialState,
    (init) => loadJSON<QuizState>(KEY) ?? init,
  );

  useEffect(() => {
    saveJSON(KEY, state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz debe usarse dentro de <QuizProvider />");
  return ctx;
}
