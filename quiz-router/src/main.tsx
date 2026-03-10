import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QuizProvider } from "./state/QuizContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
);