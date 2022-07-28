import React from "react";
import SignupForm from "./SignupForm";
import "../css/App.css";
import "../css/Modal.css";

const App = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <SignupForm />
      </header>
    </div>
  );
};

export default App;
