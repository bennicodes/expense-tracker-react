import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

const ExpenseList = () => {
  const expenses = [];
  // Fetch expenses from or local storage

  // Populate the expenses array with fetched data

  return (
    <ul className={styles.expenseList}>
      {expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <ExpenseItem key={index} expense={expense} />
        ))
      ) : (
        <p className={styles.expenseParagraph}>No expenses recorded yet!</p>
      )}
    </ul>
  );
};

export default ExpenseList;
