import classes from "./Expense.module.css";

const Expense = (props) => {
  let amount = "";

  if (props.amount < 0)
    amount = `you owe CAD${Math.abs(props.amount).toFixed(2)}`;
  else if (props.amount > 0) amount = `owes you CAD${props.amount.toFixed(2)}`;
  return (
    <li className={classes.expense}>
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
