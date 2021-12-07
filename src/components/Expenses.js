import React, { useContext } from "react";
import UserContext from "../store/user-context";
import classes from "./Expense.module.css";
import Expense from "./Expense";

const Expenses = () => {
  const userCtx = useContext(UserContext);
  console.log("printing from expenses : " + userCtx.allTransactions);
  let userTxn = userCtx.allTransactions;
  const expenseList = userTxn.map((expense) => (
    <Expense
      id={expense.txnId}
      name={expense.splitUserId}
      amount={expense.amount}
      description={expense.description}
      date={expense.txnDateTime}
    />
  ));

  let youOwe = userTxn.map((expense) => {
    if (expense.amount < 0) {
      return (
        <Expense
          id={expense.txnId}
          name={expense.splitUserId}
          amount={expense.amount}
          description={expense.description}
          date={expense.txnDateTime}
        />
      );
    }
  });
  let owesYou = userTxn.map((expense) => {
    if (expense.amount > 0) {
      return (
        <Expense
          id={expense.txnId}
          name={expense.splitUserId}
          amount={expense.amount}
          description={expense.description}
          date={expense.txnDateTime}
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
