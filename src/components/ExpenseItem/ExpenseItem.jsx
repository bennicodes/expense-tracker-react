import styles from "./ExpenseItem.module.css";

const ExpenseItem = ({ expense }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const capitalizedCategory =
    expense.category.charAt(0).toUpperCase() + expense.category.slice(1);

  return (
    <tr className={styles.expenseRow}>
      <td>{expense.name}</td>
      <td>{capitalizedCategory}</td>
      <td>{formattedDate}</td>
      <td>${expense.amount}</td>
      <td className={styles.actionContainer}>
        <button className={styles.actionButton}>Edit</button>
        <button className={styles.actionButton}>Delete</button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
