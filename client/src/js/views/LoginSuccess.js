import React from "react";
import { getUserID, getUserByID } from "../auth";

const loginSuccess = () => {
  const [userID, setUserID] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);

  const handleLogin = async () => {
    const res = await getUserID();
    setUserID(res.user);
    if (userID) {
      const userDB = await getUserByID(userID);
      if (userDB) setFirstname(userDB.firstName);
    }
  };

  React.useEffect(() => {
    handleLogin();
  }, [userID, firstname]);

  return (
    <div>
      <p>Welcome {firstname}</p>
      <a href="/logout">Log out</a>
    </div>
  );
};

export default loginSuccess;
