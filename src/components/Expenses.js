import React, { useContext, useEffect, useState } from "react";
import UserContext from "../store/user-context";
import classes from "./Expense.module.css";
import Expense from "./Expense";

const Expenses = (props) => {
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

  let youOweAmount = 0;
  let youOwe = userTxn.map((expense) => {
    if (expense.amount < 0) {
      let dateObj = new Date(Number(expense.timestamp));
      var month = dateObj.getUTCMonth() + 1; //months from 1-12.
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      let newdate = year + "/" + month + "/" + day;
      console.log(newdate);
      youOweAmount = youOweAmount + expense.amount;
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
  props.onYouOwe(Math.abs(youOweAmount));

  let owesYouAmount = 0;
  let owesYou = userTxn.map((expense) => {
    if (expense.amount > 0) {
      let dateObj = new Date(Number(expense.timestamp));
      var month = dateObj.getUTCMonth() + 1; //months from 1-12.
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      let newdate = year + "/" + month + "/" + day;
      console.log(newdate);
      owesYouAmount = owesYouAmount + -1*expense.amount;
      console.log("owes you amount : ", owesYouAmount);
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
  console.log("owes you amount : ", owesYouAmount);
  props.onYouAreOwed(Math.abs(owesYouAmount));
  props.totalBalance(youOweAmount+Math.abs(owesYouAmount));

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
