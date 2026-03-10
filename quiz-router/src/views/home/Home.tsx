import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>Quiz Router</h1>
      <Link to="/settings">Configurar y empezar</Link>
    </main>
  );
};

export default Home;
