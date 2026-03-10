import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchTriviaQuestions } from "../../api/trivia";
import { useQuiz } from "../../state/QuizContext";
import type { Difficulty } from "../../state/quizTypes";

export default function Settings() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const [amount, setAmount] = useState<number>(state.config.amount);
  const [difficulty, setDifficulty] = useState<Difficulty>(
    state.config.difficulty,
  );

  const start = async () => {
    dispatch({ type: "SET_CONFIG", payload: { amount, difficulty } });
    dispatch({ type: "LOAD_START" });

    try {
      const questions = await fetchTriviaQuestions({ amount, difficulty });
      dispatch({ type: "LOAD_SUCCESS", payload: questions });
      navigate("/quiz");
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Error desconocido cargando preguntas.";
      dispatch({ type: "LOAD_ERROR", payload: msg });
    }
  };

  return (
    <main>
      <h1>Settings</h1>

      {state.status === "error" && (
        <p style={{ color: "crimson" }}>Error: {state.error}</p>
      )}

      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <label>
          Cantidad:
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>

        <label>
          Dificultad:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <option value="any">Cualquiera</option>
            <option value="easy">Fácil</option>
            <option value="medium">Media</option>
            <option value="hard">Difícil</option>
          </select>
        </label>

        <button
          type="button"
          onClick={start}
          disabled={state.status === "loading"}
        >
          {state.status === "loading" ? "Cargando..." : "Empezar"}
        </button>

        <Link to="/">Volver</Link>
      </div>
    </main>
  );
}
