import classes from "./Expense.module.css";

const Expense = (props) => {
  console.log("Props : ", props);
  let amount = "";
  let amountInt = Math.abs(props.amount).toFixed(2);

  let profileImages = [
    "./profile/avatar-blue.png",
    "./profile/avatar-blue1.png",
    "./profile/avatar-orange.png",
    "./profile/avatar-teal.png",
  ];

  let orange = true;
  if (props.amount < 0) {
    orange = true;
    amount = `you owe CAD${amountInt}`;
  } else if (props.amount > 0) {
    orange = false;
    amount = `owes you CAD${amountInt}`;
  }
  return (
    <li
      className={
        classes.expense + " " + (orange ? classes.orange : classes.mint)
      }
    >
      <div className={classes.img}>
        <img src={profileImages[Math.floor(Math.random() * 4)]} />
      </div>
      <div className={classes.info}>
        <div>
          <h1 className={classes.name}>{props.name}</h1>
          <div className={classes.amount}>{amount}</div>
          <div>{props.description}</div>
        </div>
        <div>
          <p>{props.date}</p>
        </div>
      </div>
    </li>
  );
};
export default Expense;
