import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { category_options } from "../../data/constants/categories";
import Button from "../Button/Button";
import styles from "./Form.module.css";

const Form = ({ closeModal, addExpense, editExpense, initialExpense }) => {
  const isEdit = Boolean(initialExpense);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Refs for form fields
  const expenseNameRef = useRef(null);
  const expenseAmountRef = useRef(null);
  const expenseDateRef = useRef(null);
  const expenseCategoryRef = useRef(null);

  // Reset form on open
  useEffect(() => {
    if (initialExpense) {
      // Ensure date is in ISO string format
      const dateString =
        initialExpense.date instanceof Date
          ? initialExpense.date.toISOString().slice(0, 10)
          : initialExpense.date.slice(0, 10);

      expenseNameRef.current.value = initialExpense.name;
      expenseAmountRef.current.value = initialExpense.amount;
      expenseDateRef.current.value = dateString;
      expenseCategoryRef.current.value = initialExpense.category;
    } else {
      expenseNameRef.current.value = "";
      expenseAmountRef.current.value = "";
      expenseDateRef.current.value = "";
      expenseCategoryRef.current.value = "";
    }
    setError("");
    setSuccess("");
  }, [initialExpense]);

  // Validation logic
  const handleValidation = () => {
    const name = expenseNameRef.current.value.trim();
    const amount = parseFloat(expenseAmountRef.current.value);
    const date = expenseDateRef.current.value;
    const category = expenseCategoryRef.current.value;

    if (!name) {
      setError("Expense name is required!");
      return false;
    }

    if (!amount || isNaN(amount)) {
      setError("Amount must be a valid number!");
      return false;
    }

    if (amount <= 0) {
      setError("Amount must be greater than 0!");
      return false;
    }

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!date) {
      setError("Date is required!");
      return false;
    } else if (!dateFormat.test(date)) {
      setError(
        "Invalid date format. Please use the correct format YYYY-MM-DD."
      );
      return;
    }

    if (!category) {
      setError("Please select a category!");
      return false;
    }

    setError("");
    return true;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = handleValidation();
    if (!isFormValid) return;

    const newExpense = {
      id: isEdit ? initialExpense.id : uuidv4(),
      name: expenseNameRef.current.value.trim(),
      amount: parseFloat(expenseAmountRef.current.value),
      date: new Date(expenseDateRef.current.value),
      category: expenseCategoryRef.current.value,
    };

    // Call add or edit function based on which state the form is in
    isEdit ? editExpense(newExpense) : addExpense(newExpense);

    // Clear form
    expenseNameRef.current.value = "";
    expenseAmountRef.current.value = "";
    expenseDateRef.current.value = "";
    expenseCategoryRef.current.value = "";

    setSuccess(
      isEdit ? "Expense edited successfully!" : "Expense added successfully!"
    );
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleClose = () => {
    closeModal();
    expenseNameRef.current.value = "";
    expenseAmountRef.current.value = "";
    expenseDateRef.current.value = "";
    expenseCategoryRef.current.value = "";
    setError("");
    setSuccess("");
  };

  return (
    <>
      <h2 className={styles.formHeader}>
        {isEdit ? "Edit Expense" : "Add New Expense"}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            name="expenseName"
            placeholder="e.g. Electricity Bill"
            ref={expenseNameRef}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseAmount">Amount:</label>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            placeholder="e.g. 1000"
            step={5}
            ref={expenseAmountRef}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseDate">Due Date:</label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            ref={expenseDateRef}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseCategory">Category:</label>
          <select
            id="expenseCategory"
            name="expenseCategory"
            ref={expenseCategoryRef}
            className={styles.formSelect}
          >
            <option value="">Select Category</option>
            {category_options.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            className={`${styles.formButton} ${styles.submitButton}`}
          >
            {isEdit ? "Edit Expense" : "Add Expense"}
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className={`${styles.formButton} ${styles.closeButton}`}
          >
            Close
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
