import React, { createContext, useState, useContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import UserContext from "../store/user-context";

const AccountContext = createContext();

const Account = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const userCtx = useContext(UserContext);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          console.log("onSuccess : ", data);
          
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(data);
        },
      });
    });
  };

  const logOut = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      console.log("FROM Account signout");
      user.signOut();
    }
  };
  return (
    <AccountContext.Provider value={{ authenticate, getSession, logOut }}>
      {props.children}
    </AccountContext.Provider>
  );
};
export { Account, AccountContext };
