import { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserPool from "../UserPool";
import { AccountContext } from "./Account";
import classes from "./Header.module.css";

const Header = (props) => {
  const history = useNavigate();
  const { logOut } = useContext(AccountContext);

  useEffect(() => {
    goToDashboardHandler();
  }, []);
  const goToDashboardHandler = () => {
    history("/dashboard");
  };

  console.log("from header : " + UserPool.getCurrentUser());
  const logout = () => {
    // const user = UserPool.getCurrentUser();
    // console.log("user logout");
    // if (user) {
    //   console.log("inside logout");
    //   user.signOut();
    //   props.logout();
    // }
    logOut();
    props.logout();
  };
  return (
    <>
      <div className={classes.container}>
        <h1>Split up</h1>
        <h1 className={classes.logout} onClick={logout}>
          Logout
        </h1>
        <h1 className={classes.username}>Username</h1>
      </div>
    </>
  );
};
export default Header;
