import logo from "./logo.svg";
import "./App.css";
import UserProvider from "./store/UserProvider";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login";
import Main from "./Main";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = () => {
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  return (
    <UserProvider>
      {!isLoggedIn && (
        <div>
          <h1 className="title">SignUp</h1>
          <SignUp />
          <h1 className="title">Login</h1>
          <Login login={loginHandler} />
        </div>
      )}
      {isLoggedIn && <Main />}
    </UserProvider>
  );
}

export default App;
