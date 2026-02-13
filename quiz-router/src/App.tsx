import Home from "./views/home/home";
import Quiz from "./views/quiz/quiz";
import Result from "./views/result/result";
import NotFound from "./views/notfound/notFound";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/notFound" element={<NotFound/>}/>
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </>
    
  );
}

export default App;
