import Modal from "./UI/Modal";

const AddExpense = (props) => {
  const addExpenseHandler = (event) => {
    event.preventDefault();
    // console.log("printing the event : ", event.target.paidBy.value);
    let splitUserId = event.target.splitUserId.value;
    let description = event.target.description.value;
    let amount = parseInt(event.target.amount.value);
    let paidBy = event.target.paidBy.value;
    if (paidBy === "them") amount = -1 * amount;

    try {
      console.log("inside try catch");
      let userId = "hs@gm.com";
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
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      <h2>Add Expenses here...</h2>
      <form onSubmit={addExpenseHandler}>
        <input
          type="text"
          id="splitUserId"
          name="splitUserId"
          placeholder="Enter name or email address"
        />
        <br />
        {/* dynamic dropdown for friends list */}
        <input
          type="text"
          name="description"
          placeholder="Enter a Description"
        />
        <br />
        <input type="number" name="amount" placeholder="0.0" />
        <br />
        <input type="radio" id="you" name="paidBy" value="you" />
        <label for="you">Paid by YOU</label>
        <br />
        <input type="radio" id="them" name="paidBy" value="them" />
        <label for="them">Paid by THEM</label>
        <br />
        {/* currency drop down */}
        {/* dynamic paid by dropdown */}
        {/* fields for splitting proportion */}
        {/* date field */}
        <button type="submit">Add</button>
      </form>
      <button onClick={props.onClose}>Close</button>
    </Modal>
  );
};
export default AddExpense;
