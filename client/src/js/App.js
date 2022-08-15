import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../css/App.css";
import "../css/Modal.css";
import Landingpage from "./views/Landingpage";
import SignInForm from "./views/SignInForm";
import SignupForm from "./views/SignupForm";
import JoinClub from "./views/JoinClub";
import LoginSuccess from "./views/LoginSuccess";
import Logout from "./views/Logout";

const App = () => {
  const [isAuth, setIsAuth] = React.useState(null);
  const [userID, setUserID] = React.useState(null);

  React.useEffect(() => {
    fetch("/auth/isAuth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setUserID(data.userID);
      });
  }, [isAuth, userID]);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signIn" element={<SignInForm />} />
            <Route path="/signUp" element={<SignupForm />} />
            <Route
              path="/joinClub"
              element={
                isAuth === false ? <Navigate to="/signIn" /> : <JoinClub />
              }
            />
            <Route
              path="/loginSuccess"
              element={
                isAuth === false ? (
                  <Navigate to="/signIn" />
                ) : userID !== null ? (
                  <LoginSuccess userID={userID} />
                ) : (
                  "Loading..."
                )
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
