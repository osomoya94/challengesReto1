export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export const questions: Question[] = [
  {
    id: "q1",
    prompt: "¿Qué significa === en JavaScript?",
    options: ["Comparación débil", "Asignación", "Comparación estricta", "Concatenación"],
    correctIndex: 2,
  },
  {
    id: "q2",
    prompt: "¿Qué devuelve typeof null?",
    options: ["null", "object", "undefined", "number"],
    correctIndex: 1,
  },
];
