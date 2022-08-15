import React from "react";
import { getUserByID } from "../helpers";

const LoginSuccess = (props) => {
  const [firstname, setFirstname] = React.useState(null);
  const [userID, setUserID] = React.useState(null);

  const handleLogin = async () => {
    if (userID) {
      const user = await getUserByID(userID);
      if (user) setFirstname(user.firstName);
    }
  };

  React.useEffect(() => {
    setUserID(props.userID);
    handleLogin();
  }, [userID, firstname]);

  return (
    <div>
      {firstname !== null ? <p>Welcome {firstname}</p> : <p>"Loading..."</p>}
      <a href="/logout">Log out</a>
    </div>
  );
};

export default LoginSuccess;
