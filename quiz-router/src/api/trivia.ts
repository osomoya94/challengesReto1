import type { Question, QuizConfig } from "../state/quizTypes";

type TriviaResponse = {
  response_code: number;
  results: Array<{
    type: "multiple" | "boolean";
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
};

function decodeHtml(text: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeId(i: number) {
  const hasUUID =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";
  return hasUUID ? crypto.randomUUID() : `${Date.now()}-${i}`;
}

export async function fetchTriviaQuestions(
  config: QuizConfig,
  signal?: AbortSignal,
): Promise<Question[]> {
  const params = new URLSearchParams();
  params.set("amount", String(config.amount));
  params.set("type", "multiple");
  if (config.difficulty !== "any") params.set("difficulty", config.difficulty);

  const res = await fetch(`https://opentdb.com/api.php?${params.toString()}`, {
    signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = (await res.json()) as TriviaResponse;
  if (data.response_code !== 0)
    throw new Error("La API no devolvió preguntas válidas.");

  return data.results.map((q, i) => {
    const correct = decodeHtml(q.correct_answer);
    const incorrect = q.incorrect_answers.map(decodeHtml);
    const options = shuffle([...incorrect, correct]);
    const correctIndex = options.indexOf(correct);

    return {
      id: makeId(i),
      prompt: decodeHtml(q.question),
      options,
      correctIndex,
    };
  });
}
