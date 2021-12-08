import { useState } from "react";
import AddExpense from "../AddExpense";
import classes from "./DashboardTop.module.css";

const DashboardTop = (props) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const showAddHandler = () => {
    setShowAddExpense(true);
  };
  const hideAddHandler = () => {
    setShowAddExpense(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h1>Dashboard</h1>
        <button onClick={showAddHandler} className={classes.orange}>
          Add an expense
        </button>
        <button className={classes.mint}>Settle Up</button>
      </div>
      <div className={classes.summary}>
        <div className={classes.summary_item}>
          <h3>Total Balance</h3>
          <div>{props.totalBalance}</div>
        </div>
        <div className={classes.summary_item}>
          <h3>You Owe</h3>
          <div>{props.youOwe}</div>
        </div>
        <div className={classes.summary_item}>
          <h3>You Are Owed</h3>
          <div>{props.youAreOwed}</div>
        </div>
      </div>
      {showAddExpense && <AddExpense onClose={hideAddHandler} stateChange={props.stateChange}/>}
    </div>
  );
};
export default DashboardTop;
