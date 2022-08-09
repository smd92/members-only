import React from "react";

const loginSuccess = () => {
  const [userID, setUserID] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);

  const getSessionPassport = () => {
    fetch("/sessionPassport")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((passport) => setUserID(passport.user))
      .then(() => getUser(userID));
  };

  const getUser = (userID) => {
    if (userID) {
      fetch(`/users/${userID}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((user) => setFirstname(user.firstName));
    }
  };

  React.useEffect(() => {
    getSessionPassport();
  }, [userID]);

  return (
    <div>
      <p>Welcome {firstname}</p>
      <a href="/logout">Log out</a>
    </div>
  );
};

export default loginSuccess;
