import React from "react";

const JoinClub = () => {
  const [passphraseInput, setPassphraseInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [errorPassphrase, setErrorPassphrase] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorUser, setErrorUser] = React.useState("");

  const checkPassphrase = (passphraseInput) => {
    if (passphraseInput !== process.env.REACT_APP_PASSPHRASE) {
      setErrorPassphrase(true);
    } else {
      setErrorPassphrase(false);
    }
  };

  const getUserByEmail = async (emailInput) => {
    try {
      //get user by email
      const res = await fetch(`/users/${emailInput}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resJSON = await res.json();
      setUser(resJSON);
      setErrorEmail(false);
    } catch (err) {
      setErrorUser(emailInput);
      setErrorEmail(true);
    }
  };

  const JoinClub = () => {
    checkPassphrase(passphraseInput);
    getUserByEmail(emailInput);
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
      <button type="button" onClick={() => JoinClub()}>
        Submit
      </button>
      {errorEmail && <p>Could not find user {errorUser}</p>}
      {errorPassphrase && <p>Worng Passphrase</p>}
    </div>
  );
};

export default JoinClub;
