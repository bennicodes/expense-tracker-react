import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Form.module.css";
import Button from "../Button/Button";

const Form = ({ closeModal, addExpense }) => {
  const [expenseList, setExpenseList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect the form data
    const registerForm = new FormData(e.target);
    const expense = Object.fromEntries(registerForm.entries());

    const newExpense = {
      id: uuidv4(),
      name: expense.expenseName,
      category: expense.expenseCategory,
      amount: parseFloat(expense.expenseAmount), // Ensure it's a number
      date: new Date(expense.expenseDate),
    };

    addExpense(newExpense);
    e.target.reset();
  };

  return (
    <>
      <h2>Add New Expense</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            name="expenseName"
            placeholder="e.g Electricity Bill"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseAmount">Amount:</label>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            placeholder="e.g $1000"
            step={5}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseDate">Due Date:</label>
          <input type="date" id="expenseDate" name="expenseDate" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expenseCategory">Category:</label>
          <select id="expenseCategory" name="expenseCategory" required>
            <option value="">Select Category</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="grocery">Grocery</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={`${styles.formButton} ${styles.submitButton}`}
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={closeModal}
            className={`${styles.formButton} ${styles.closeButton}`}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
