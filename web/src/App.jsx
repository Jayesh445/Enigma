import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage";
import SignInPage from "./pages/Signin";
import LoginPage from "./pages/LoginPage";
import FullScreenQuiz from "./components/Quiz";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/quiz" element={<FullScreenQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
