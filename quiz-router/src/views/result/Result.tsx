import { Link, Navigate } from "react-router-dom";
import { useQuiz } from "../../state/QuizContext";

export default function Result() {
  const { state, dispatch } = useQuiz();

  if (state.status !== "ready" || state.questions.length === 0) {
    return <Navigate to="/settings" replace />;
  }

  const correctAnswers = state.answers.reduce((total, answer) => {
    const q = state.questions.find((x) => x.id === answer.questionId);
    return total + (q?.correctIndex === answer.selectedIndex ? 1 : 0);
  }, 0);

  const retrySame = () => dispatch({ type: "RESTART" });

  return (
    <main>
      <h1>Resultado</h1>
      <p>
        Aciertos: {correctAnswers} / {state.questions.length}
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/quiz" onClick={retrySame}>
          Reintentar
        </Link>
        <Link to="/settings">Nuevo quiz</Link>
      </div>
    </main>
  );
}
