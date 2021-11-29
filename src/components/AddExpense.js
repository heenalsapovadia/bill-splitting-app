import Modal from "./UI/Modal";

const AddExpense = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h2>Add Expenses here...</h2>
      <form>
        <input type="text" placeholder="Enter name or email address" />
        <br />
        {/* dynamic dropdown for friends list */}
        <input type="text" placeholder="Enter a Description" />
        <br />
        <input type="number" placeholder="0.0" />
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
        <button>Add</button>
      </form>
      <button onClick={props.onClose}>Close</button>
    </Modal>
  );
};
export default AddExpense;
