import { Link } from "react-router-dom";
import { questions } from "../../data/questions";
import { useQuiz } from "../../state/QuizContext";

const Result = () => {
  const { state, dispatch } = useQuiz();
  const correctAnswers = state.answers.reduce((total, answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    return total + (question?.correctIndex === answer.selectedIndex ? 1 : 0);
  }, 0);

  const handleRestart = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <main>
      <h1>Resultado</h1>
      <p>
        Aciertos: {correctAnswers} / {questions.length}
      </p>
      <Link to="/" onClick={handleRestart}>
        Volver a empezar
      </Link>
    </main>
  );
};

export default Result;
