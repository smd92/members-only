import React from "react";

const JoinClub = () => {
  const [passphraseInput, setPassphraseInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [errorPassphrase, setErrorPassphrase] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorUser, setErrorUser] = React.useState("");
  const [errorUpdate, setErrorUpdate] = React.useState(false);

  const checkPassphrase = (passphraseInput) => {
    return passphraseInput !== process.env.REACT_APP_PASSPHRASE;
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

  const updateMembership = async (user) => {
    try {
      const res = await fetch(`/users/${user["_id"]}/membershipStatus`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ membershipStatus: true }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setErrorUpdate(false);
    } catch (err) {
      console.log(err);
      setErrorUpdate(true);
    }
  };

  const JoinClub = () => {
    //check if passphrase is correct
    setErrorPassphrase(checkPassphrase(passphraseInput));
    //if passphrase is correct, get user by email
    if (!errorPassphrase) getUserByEmail(emailInput);
    //if email/user was found in db, update user.membershipStatus
    if (!errorEmail) updateMembership(user);
  };

  return (
    <div>
      <label htmlFor="passphrase">Enter the secret passphrase</label>
      <input
        id="passphrase"
        name="passphrase"
        type="password"
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
      {errorPassphrase && <p>Wrong Passphrase</p>}
      {errorUpdate && (
        <p>Could not update membershipStatus. Please try again.</p>
      )}
    </div>
  );
};

export default JoinClub;
