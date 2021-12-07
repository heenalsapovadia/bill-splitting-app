import React, { useCallback, useEffect, useState } from "react";
import AddExpense from "../../components/AddExpense";
import { Link } from "react-router-dom";
import DashboardTop from "../../components/Dashboard/DashboardTop";
import Expenses from "../../components/Expenses";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./DashboardPage.module.css";
const DashboardPage = () => {
  //   console.log("inside dashboard");
  const [showExpenses, setShowExpenses] = useState(true);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [totalBalance, setTotalBalance] = useState(0.0);
  const [youOwe, setYouOwe] = useState(0.0);
  const [youAreOwed, setYouAreOwed] = useState(0.0);

  const totalBalanceHandler = useCallback(async () => {
    // fetch total balance from dynamo
    try {
      const response = await fetch("http://localhost:3001/friends/totalSum");
      if (!response.ok) {
        throw new Error("SOmething went wrong");
      }
      const data = await response.json();
      console.log("total Sum message received - ", data.message);
      setTotalBalance(data.message);
    } catch (error) {
      console.log("Error : ", error.message);
    }
    // setTotalBalance()
  });

  useEffect(() => {
    totalBalanceHandler();
  }, []);

  const youOweHandler = () => {};

  const youAreOwedHandler = () => {};

  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftnav}>
          <Link className={classes.link} to="/dashboard">
            <h2>Dashboard</h2>
          </Link>
          <Link className={classes.link} to="">
            <h2>Friends</h2>
          </Link>
        </div>
        <div className={classes.main}>
          <DashboardTop
            totalBalance={totalBalance}
            youOwe={youOwe}
            youAreOwed={youAreOwed}
            // showAddExpense={}
          />
          <Expenses />
          {/* {showExpenses && <Expenses />}
      {showAddExpense && <AddExpense />} */}
        </div>
        <div className={classes.rightnav}></div>
      </div>
    </>
  );
};
export default DashboardPage;
