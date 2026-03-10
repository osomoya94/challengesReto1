import { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { questions } from "../../data/questions";
import { useQuiz } from "../../state/QuizContext";

const Quiz = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const currentQuestion = questions[state.currentIndex];
  const currentAnswer = useMemo(
    () => state.answers.find((answer) => answer.questionId === currentQuestion?.id),
    [currentQuestion?.id, state.answers],
  );

  if (state.finished) {
    return <Navigate to="/result" replace />;
  }

  if (!currentQuestion) {
    dispatch({ type: "FINISH" });
    return <Navigate to="/result" replace />;
  }

  const handleSelect = (selectedIndex: number) => {
    dispatch({
      type: "ANSWER",
      payload: {
        questionId: currentQuestion.id,
        selectedIndex,
      },
    });
  };

  const handleNext = () => {
    const isLastQuestion = state.currentIndex === questions.length - 1;

    if (isLastQuestion) {
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
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentAnswer?.selectedIndex === index;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(index)}
              aria-pressed={isSelected}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={handleNext} disabled={!currentAnswer}>
        {state.currentIndex === questions.length - 1 ? "Ver resultado" : "Siguiente"}
      </button>
    </main>
  );
};

export default Quiz;
