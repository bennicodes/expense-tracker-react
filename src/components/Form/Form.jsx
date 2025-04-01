import React from "react";
import styles from "./Form.module.css";

const Form = () => {
  const closeFormModal = () => {};
  return (
    <div className={styles.modalBackground}>
      <div className={styles.formContainer}>
        <h2>Add New Expense</h2>
        <form className={styles.form}>
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
            <label htmlFor="expenseDate">Date:</label>
            <input type="date" id="expenseDate" name="expenseDate" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="expenseCategory">Category:</label>
            <select id="expenseCategory" name="expenseCategory" required>
              <option value="">Select Category</option>
              <option value="groceries">Housing</option>
              <option value="eatingOut">Utilities</option>
              <option value="eatingOut">Grocery</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Clothing</option>
              <option value="miscellaneous">Entertainment</option>
              <option value="miscellaneous">Other</option>
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
              className={`${styles.formButton} ${styles.closeButton}`}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
