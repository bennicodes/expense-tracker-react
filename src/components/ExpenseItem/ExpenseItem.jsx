import Button from "../Button/Button";
import styles from "./ExpenseItem.module.css";
// Format date to display correctly
const ExpenseItem = ({ expense }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // Capitalize the first letter of the category
  const capitalizedCategory =
    expense.category.charAt(0).toUpperCase() + expense.category.slice(1);
  return (
    <li className={styles.expenseItem}>
      <h3>{expense.name}</h3>
      <span>
        <h4>Category:</h4>
        <p>{capitalizedCategory}</p>
      </span>
      <span>
        <h4>Date:</h4>
        <p>{formattedDate}</p>
      </span>
      <span>
        <h4>Amount:</h4>
        <p>${expense.amount}</p>
      </span>
      <div className={styles.actionContainer}>
        <button className={styles.actionButton}>Edit</button>
        <button className={styles.actionButton}>Delete</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
