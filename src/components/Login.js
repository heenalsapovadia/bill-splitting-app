import React, { useContext, useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import UserContext from "../store/user-context";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userCtx = useContext(UserContext);

  const onSubmit = (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        console.log("onSuccess : ", data);
        // fetch user object from dynamo
        try {
          const response = await fetch(
            "http://localhost:3001/friends/userDetails"
          );
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const data = await response.json();
          console.log("user details message received - ", data);
        } catch (error) {
          console.log("User fetch error ", error);
        }

        props.login(); // redirect to Dashboard
      },
      onFailure: (err) => {
        console.error("onFailure : ", err);
        if (err.toString().includes("UserNotConfirmedException"))
          alert("Please Confirm Registration to Login!");
        else if (err.toString().includes("NotAuthorizedException"))
          alert("Incorrect username or password!");
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequried : ", data);
      },
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
