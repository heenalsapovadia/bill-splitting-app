import React, { useContext, useEffect, useState } from "react";
import UserContext from "../store/user-context";
import classes from "./Expense.module.css";
import Expense from "./Expense";

const Expenses = () => {
  // useEffect() rerender api call to fetch all txn
  const [dummy, setDummy] = useState(null);
  const userCtx = useContext(UserContext);
  console.log("Printing from expenses : " + userCtx.allTransactions);
  let userTxn = userCtx.allTransactions;
  const expenseList = userTxn.map((expense) => {
    let dateObj = new Date(Number(expense.timestamp));
    var month = dateObj.getUTCMonth() + 1; //months from 1-12.
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let newdate = year + "/" + month + "/" + day;
    console.log(newdate);

    return (
      <Expense
        id={expense.txnId}
        name={expense.splitUserId}
        amount={expense.amount}
        description={expense.description}
        date={newdate}
      />
    );
  });

  let youOwe = userTxn.map((expense) => {
    if (expense.amount < 0) {
      let dateObj = new Date(Number(expense.timestamp));
      var month = dateObj.getUTCMonth() + 1; //months from 1-12.
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      let newdate = year + "/" + month + "/" + day;
      console.log(newdate);
      return (
        <Expense
          id={expense.txnId}
          name={expense.splitUserId}
          amount={expense.amount}
          description={expense.description}
          date={newdate}
        />
      );
    }
  });
  let owesYou = userTxn.map((expense) => {
    if (expense.amount > 0) {
      let dateObj = new Date(Number(expense.timestamp));
      var month = dateObj.getUTCMonth() + 1; //months from 1-12.
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      let newdate = year + "/" + month + "/" + day;
      console.log(newdate);
      return (
        <Expense
          id={expense.txnId}
          name={expense.splitUserId}
          amount={expense.amount}
          description={expense.description}
          date={newdate}
        />
      );
    }
  });

  return (
    <section className={classes.container}>
      <div className={classes.youowe}>
        <ul>{youOwe}</ul>
      </div>
      <div className={classes.owesyou}>
        <ul>{owesYou}</ul>
      </div>
      {/* <ul>{expenseList}</ul> */}
    </section>
  );
};
export default Expenses;
