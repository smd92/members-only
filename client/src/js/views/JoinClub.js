import React from "react";

const JoinClub = () => {
  return (
    <div>
      <form action="/joinClub" method="POST">
        <label htmlFor="passphrase">Enter the secret passphrase</label>
        <input id="passphrase" name="passphrase" type="text" required/>
        <br />
        <label htmlFor="email">Your username/email</label>
        <input id="email" name="email" type="email" required/>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JoinClub;
