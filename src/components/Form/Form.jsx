import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button/Button";
import FormValidation from "../FormValidation/FormValidation";
import styles from "./Form.module.css";

const Form = ({ closeModal, addExpense }) => {
  // User feedback
  const { error, validate, clearError } = FormValidation();
  const [success, setSuccess] = useState("");

  // Submit logic
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

    // Validate the form data
    const isValid = validate(newExpense);
    if (!isValid) return;

    // Add the expense to the expenses array
    addExpense(newExpense);
    e.target.reset();

    setSuccess("Expense added successfully!");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const handleChange = () => {
    clearError();
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseDate">Due Date:</label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseCategory">Category:</label>
          <select
            id="expenseCategory"
            name="expenseCategory"
            onChange={handleChange}
          >
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

        {/* Validation Message */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={`${styles.formButton} ${styles.submitButton}`}
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() => {
              closeModal();
              clearError();
            }}
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
