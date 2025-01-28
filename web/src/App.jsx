
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage";
import SignInPage from "./pages/Signin"; 

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
