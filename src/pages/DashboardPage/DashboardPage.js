import React, { useCallback, useEffect, useState, useContext } from "react";
import AddExpense from "../../components/AddExpense";
import { Link } from "react-router-dom";
import DashboardTop from "../../components/Dashboard/DashboardTop";
import Expenses from "../../components/Expenses";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./DashboardPage.module.css";
import UserContext from "../../store/user-context";
const DashboardPage = () => {
  //   console.log("inside dashboard");
  const userCtx = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const [dummy, setDummy] = useState(false);
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

  const dummyStateHandler = () => {
    setDummy(!dummy);
  }

  useEffect(() => {
    totalBalanceHandler();
  }, []);

  const youOweHandler = () => {};

  const youAreOwedHandler = () => {};

  const FriendsListPage = () => {
    let friends = new Map();

    let transactionList = userCtx.allTransactions;
    transactionList.map((transaction) => {
      console.log(transaction);
      if (friends.has(transaction.splitUserId)) {
        console.log("yes");
        let curr = friends.get(transaction.splitUserId);
        curr += parseInt(transaction.amount);
        friends.set(transaction.splitUserId, curr);
      } else {
        console.log("no");
        friends.set(transaction.splitUserId, parseInt(transaction.amount));
      }
    });

    const friendsList = [...friends.entries()].map((frnd) => {
      console.log(frnd);
      return (
        <div>
          <p>
            {frnd[0]} {frnd[1]}
          </p>
        </div>
      );
    });

    return (
      <div>
        <p>Friends</p>
        {friendsList}
      </div>
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftnav}>
          <Link className={classes.link} to="/dashboard">
            <h2
              onClick={() => {
                console.log("0");
                setIndex(0);
              }}
            >
              Dashboard
            </h2>
          </Link>
          <Link className={classes.link} to="">
            <h2
              onClick={() => {
                console.log("1");
                setIndex(1);
              }}
            >
              Friends
            </h2>
          </Link>
        </div>
        <div className={classes.main}>
          {index == 0 ? (
            <>
              <DashboardTop
                totalBalance={totalBalance}
                youOwe={youOwe}
                youAreOwed={youAreOwed}
                stateChange={dummyStateHandler}
                // showAddExpense={}
              />
              <Expenses />
            </>
          ) : (
            <>
              <FriendsListPage />
            </>
          )}

          {/* {showExpenses && <Expenses />}
      {showAddExpense && <AddExpense />} */}
        </div>
        <div className={classes.rightnav}></div>
      </div>
    </>
  );
};
export default DashboardPage;
