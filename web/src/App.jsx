
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage";
import SignInPage from "./pages/Signin"; 

import RegisterPage from "./pages/Register";

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        {/* <Route path="/paper-exams" element={<Signin} */}
        <Route path="/Initial" element={<ExamInitial/>}/>
        
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
