import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = () => {
  const history = useNavigate();

  useEffect(() => {
    goToDashboardHandler();
  }, []);
  const goToDashboardHandler = () => {
    history("/dashboard");
  };
  return (
    <>
      <div className={classes.container}>
        <h1>Split up</h1>
        <h1 className={classes.logout}>Logout</h1>
        <h1 className={classes.username}>Username</h1>
      </div>
    </>
  );
};
export default Header;
