import React, { useState } from "react";
import UserPool from "../../UserPool";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userName, setUserName] = useState("");

  const registerUserToDynamoDB = (user) => {
    try {
      console.log("inside try catch");
      let userId = "hs@gm.com";
      fetch(
        "https://80rc5nsfue.execute-api.us-east-2.amazonaws.com/transactions?userId=" +
          userId,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("sent txn");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // set this userObj from event
    let user = {
      userName: userName,
      userId: email,
      mobileNumber: mobileNo,
    };

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err);
        if (err.toString().includes("InvalidPasswordException"))
          alert(
            "Password is Invalid! - Please follow : Length>8, Containing LowerCase, UpperCase, Digit, Symbol"
          );
      } else {
        console.log("DATA : ", data);
        alert("Please confirm registration from email!");
        // clear the fields --- how to?

        // register user to dynamodb
        // registerUserToDynamoDB(user);
      }
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes["signup-form"]} onSubmit={onSubmit}>
        <label className={classes["signup-label"]} htmlFor="username">
          Username
        </label>
        <input
          className={classes["signup-input"]}
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <label className={classes["signup-label"]} htmlFor="mobileno">
          MobileNo
        </label>
        <input
          className={classes["signup-input"]}
          value={mobileNo}
          onChange={(event) => setMobileNo(event.target.value)}
        ></input>
        <label className={classes["signup-label"]} htmlFor="email">
          Email
        </label>
        <input
          className={classes["signup-input"]}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label className={classes["signup-label"]} htmlFor="password">
          Password
        </label>
        <input
          className={classes["signup-input"]}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button className={classes["signup-submit"]} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
