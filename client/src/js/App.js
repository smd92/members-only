import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/App.css";
import "../css/Modal.css";
import Landingpage from "./views/Landingpage";
import SignInForm from "./views/SignInForm";
import SignupForm from "./views/SignupForm";
import JoinClub from "./views/JoinClub";
import LoginSuccess from "./views/LoginSuccess";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signIn" element={<SignInForm />} />
            <Route path="/signUp" element={<SignupForm />} />
            <Route path="/joinClub" element={<JoinClub />} />
            <Route path="/loginSuccess" element={<LoginSuccess />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
