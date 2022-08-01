import React from "react";

const SignupForm = () => {
  const [passwordValue, setPasswordValue] = React.useState(null);
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState(null);
  const confirmPasswordElement = React.useRef(null);

  React.useEffect(() => {
    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordElement.current.setCustomValidity(
        "Your passwords do not match"
      );
      console.log(confirmPasswordElement.current.validationMessage);
    } else if (passwordValue === confirmPasswordValue) {
      confirmPasswordElement.current.setCustomValidity("");
    }
  }, [passwordValue, confirmPasswordValue]);

  return (
    <div>
      <p>SignupForm</p>
      <form action="/users" method="POST">
        <div>
          <label htmlFor="firstName">Firstname</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            maxLength="50"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Lastname</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            maxLength="100"
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength="100"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8"
            maxLength="100"
            required
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength="8"
            maxLength="100"
            required
            pattern={passwordValue}
            onChange={(event) => setConfirmPasswordValue(event.target.value)}
            ref={confirmPasswordElement}
          />
        </div>
        <input
          id="membershipStatus"
          name="membershipStatus"
          type="hidden"
          value="false"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
