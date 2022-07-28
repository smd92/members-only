import React from "react";

const SignupForm = () => {
  return (
    <div>
      <p>SignupForm</p>
      <form action="#" method="POST">
        <div>
          <label for="firstName">Firstname</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            maxLength="50"
            required
          />
        </div>
        <div>
          <label for="lastName">Lastname</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            maxLength="100"
            required
          />
        </div>
        <div>
          <label for="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength="100"
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8"
            maxLength="100"
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength="8"
            maxLength="100"
            required
          />
        </div>
      </form>
      <button type="submit">Sign Up</button>
    </div>
  );
};

export default SignupForm;
