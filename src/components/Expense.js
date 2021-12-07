import classes from "./Expense.module.css";

const Expense = (props) => {
  let amount = "";
  let orange = true;
  if (props.amount < 0) {
    orange = true;
    amount = `you owe CAD${Math.abs(props.amount).toFixed(2)}`;
  } else if (props.amount > 0) {
    orange = false;
    amount = `owes you CAD${props.amount.toFixed(2)}`;
  }
  return (
    <li
      className={
        classes.expense + " " + (orange ? classes.orange : classes.mint)
      }
    >
      <div>
        <h3>{props.name}</h3>
        <div className={classes.amount}>{amount}</div>
        <div>{props.description}</div>
      </div>
      <div>
        <p>{props.date}</p>
      </div>
    </li>
  );
};
export default Expense;
