import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h1>Página no encontrada</h1>
      <Link to="/">Ir al inicio</Link>
    </main>
  );
};

export default NotFound;
