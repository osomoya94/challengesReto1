import { useMemo } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../../state/QuizContext";

export default function Quiz() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  if (state.status === "idle") {
    return (
      <main>
        <p>No hay preguntas cargadas.</p>
        <Link to="/settings">Ir a Settings</Link>
      </main>
    );
  }

  if (state.status === "loading") {
    return (
      <main>
        <p>Cargando preguntas...</p>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main>
        <p style={{ color: "crimson" }}>Error: {state.error}</p>
        <Link to="/settings">Volver a Settings</Link>
      </main>
    );
  }

  // status === "ready"
  const questions = state.questions;
  const currentQuestion = questions[state.currentIndex];

  if (state.finished) return <Navigate to="/result" replace />;
  if (!currentQuestion) return <Navigate to="/result" replace />;

  const currentAnswer = useMemo(
    () => state.answers.find((a) => a.questionId === currentQuestion.id),
    [currentQuestion.id, state.answers],
  );

  const handleSelect = (selectedIndex: number) => {
    dispatch({
      type: "ANSWER",
      payload: { questionId: currentQuestion.id, selectedIndex },
    });
  };

  const handleNext = () => {
    const isLast = state.currentIndex === questions.length - 1;
    if (isLast) {
      dispatch({ type: "FINISH" });
      navigate("/result");
      return;
    }
    dispatch({ type: "NEXT" });
  };

  return (
    <main>
      <p>
        Pregunta {state.currentIndex + 1} de {questions.length}
      </p>

      <h1>{currentQuestion.prompt}</h1>

      <div>
        {currentQuestion.options.map((opt, index) => {
          const isSelected = currentAnswer?.selectedIndex === index;
          return (
            <button
              key={`${currentQuestion.id}-${opt}`}
              type="button"
              onClick={() => handleSelect(index)}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={handleNext} disabled={!currentAnswer}>
        {state.currentIndex === questions.length - 1
          ? "Ver resultado"
          : "Siguiente"}
      </button>
    </main>
  );
}
