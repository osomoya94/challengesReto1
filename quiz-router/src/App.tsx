import Home from "./views/home/Home";
import Quiz from "./views/quiz/Quiz";
import Result from "./views/result/Result";
import NotFound from "./views/notfound/NotFound";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </>
    
  );
}

export default App;
