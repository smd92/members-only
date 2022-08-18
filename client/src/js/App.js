import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../css/App.css";
import "../css/Modal.css";
import { getUserByID } from "./helpers";
import Landingpage from "./views/Landingpage";
import SignInForm from "./views/SignInForm";
import SignupForm from "./views/SignupForm";
import JoinClub from "./views/JoinClub";
import Dashboard from "./views/Dashboard";
import MessageForm from "./views/MessageForm";
import Logout from "./views/Logout";

const App = () => {
  const [isAuth, setIsAuth] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(null);

  const handleLogin = async () => {
    if (userID) {
      const user = await getUserByID(userID);
      if (user) {
        setFirstname(user.firstName);
        setIsAdmin(user.isAdmin);
      }
    }
  };

  React.useEffect(() => {
    fetch("/auth/isAuth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setUserID(data.userID);
        handleLogin();
      });
  }, [isAuth, userID]);

  return (
    <div className="App">
      <header className="App-header">
        {isAuth && (
          <div className="headerItems">
            <p>Welcome {firstname}</p>
            <a href="/addMessage">Add Message</a>
            <a href="/logout">Log out</a>
          </div>
        )}
      </header>
      <main className="App-body">
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
              path="/dashboard"
              element={
                isAuth === false ? (
                  <Navigate to="/signIn" />
                ) : userID !== null ? (
                  <Dashboard isAdmin={isAdmin} />
                ) : (
                  "Loading..."
                )
              }
            />
            <Route
              path="/addMessage"
              element={
                isAuth === false ? (
                  <Navigate to="/signIn" />
                ) : (
                  <MessageForm userID={userID} />
                )
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
