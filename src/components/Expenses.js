import React, { useContext } from "react";
import UserContext from "../store/user-context";

import Expense from "./Expense";

const Expenses = () => {
  const userCtx = useContext(UserContext);
  console.log("printing from expenses : " + userCtx.allTransactions);
  let userTxn = userCtx.allTransactions;
  const DUMMY_txn = [
    {
      id: "f1",
      name: "monisha",
      amount: -100,
      currency: "CAD",
    },
    {
      id: "f2",
      name: "psp",
      amount: 200,
      currency: "CAD",
    },
    {
      id: "f1",
      name: "anjali",
      amount: -100.25,
      currency: "CAD",
    },
  ];
  const expenseList = userTxn.map((expense) => (
    <Expense
      id={expense.txnId}
      name={expense.splitUserId}
      amount={expense.amount}
      description={expense.description}
      date={expense.txnDateTime}
    />
  ));
  return (
    <section>
      <ul>{expenseList}</ul>
    </section>
  );
};
export default Expenses;
