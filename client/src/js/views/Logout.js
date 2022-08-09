import React from "react";

const Logout = () => {
  React.useEffect(() => {
    fetch("/users/logout").then().catch((err => console.log(err)));
  }, []);

  return (
    <div>
      <h1>Goodbye!</h1>
    </div>
  );
};

export default Logout;
