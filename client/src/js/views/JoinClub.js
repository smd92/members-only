import { set } from "mongoose";
import React from "react";

const JoinClub = () => {
  const [passphraseInput, setPassphraseInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [user, setUser] = React.useState(null);

  const joinClub = async (emailInput) => {
    try {
      //get user by email
      const res = await fetch(`/users/${emailInput}`);
      const resJSON = await res.json();
      setUser(resJSON);
      //
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <label htmlFor="passphrase">Enter the secret passphrase</label>
      <input
        id="passphrase"
        name="passphrase"
        type="text"
        required
        onChange={(event) => setPassphraseInput(event.target.value)}
      />
      <br />
      <label htmlFor="email">Your username/email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={(event) => setEmailInput(event.target.value)}
      />
      <br />
      <button type="button" onClick={() => joinClub(emailInput)}>
        Submit
      </button>
    </div>
  );
};

export default JoinClub;
