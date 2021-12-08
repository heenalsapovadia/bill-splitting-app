import { useContext } from "react";
import UserContext from "../store/user-context";
import Modal from "./UI/Modal";
import classes from "./AddExpense.module.css";
const AddExpense = (props) => {
  const userCtx = useContext(UserContext);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    // console.log("printing the event : ", event.target.paidBy.value);
    let userId = userCtx.userProfile.userId;

    let splitUserId = event.target.splitUserId.value;
    let description = event.target.description.value;
    let amount = parseInt(event.target.amount.value);
    let paidBy = event.target.paidBy.value;
    if (paidBy === "them") amount = -1 * amount;

    const refreshTransaction = async () => {
      let res = await fetch(
        "https://80rc5nsfue.execute-api.us-east-2.amazonaws.com/transactions?userId=" +
          userCtx.userProfile.userId
      );
      if (!res.ok) {
        throw new Error("Could not fetch transactions!");
      }
      const txnData = await res.json();
      console.log("user transactions received - ", txnData);
      userCtx.setTransactions(txnData);
      props.stateChange();
    };

    try {
      console.log("inside try catch");

      fetch(
        "https://80rc5nsfue.execute-api.us-east-2.amazonaws.com/transactions?userId=" +
          userId,
        {
          method: "POST",
          body: JSON.stringify({
            splitUserId: splitUserId,
            amount: amount,
            description: description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("sent txn");
      // update txn context
      refreshTransaction();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      {/* <h2 className={classes.title}>Add Expenses here...</h2> */}
      <header className={classes.header}>
        Add an expense
        <p class="dismiss" onClick={props.onClose}>
          X
        </p>
      </header>
      <div className={classes.content}>
        <form className={classes.form} onSubmit={addExpenseHandler}>
          <input
            className={classes.input}
            type="text"
            id="splitUserId"
            name="splitUserId"
            placeholder="Enter name or email address"
          />
          <br />
          {/* dynamic dropdown for friends list */}
          <input
            className={classes.input}
            type="text"
            name="description"
            placeholder="Enter a Description"
          />
          <br />
          <input
            className={classes.input + " " + classes.amt}
            type="number"
            name="amount"
            placeholder="0.0"
          />
          <br />
          <div className={classes.radiogrp}>
            <div className={classes.rd1}>
              <input
                className={classes.rd1Input}
                type="radio"
                id="you"
                name="paidBy"
                value="you"
              />
              <label for="you">Paid by YOU</label>
            </div>
            <br />
            <div className={classes.rd2}>
              <input
                className={classes.rd2Input}
                type="radio"
                id="them"
                name="paidBy"
                value="them"
              />
              <label for="them">Paid by THEM</label>
            </div>
          </div>
          <br />
          {/* currency drop down */}
          {/* dynamic paid by dropdown */}
          {/* fields for splitting proportion */}
          {/* date field */}
          <div className={classes.btngrp}>
            <button className={classes.add} type="submit">
              Add
            </button>
            <button className={classes.close} onClick={props.onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddExpense;
