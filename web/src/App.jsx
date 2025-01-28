import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage";
import SignInPage from "./pages/Signin";
import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
