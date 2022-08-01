import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/App.css";
import "../css/Modal.css";
import Landingpage from "./views/Landingpage";
import SignupForm from "./views/SignupForm";
import JoinClub from "./views/JoinClub";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signUp" element={<SignupForm />} />
            <Route path="/joinClub" element={<JoinClub />}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
