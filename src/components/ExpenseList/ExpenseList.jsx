import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ expenses }) => {
  return (
    <ul className={styles.expenseList}>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      ) : (
        <p className={styles.expenseParagraph}>No expenses recorded yet!</p>
      )}
    </ul>
  );
};

export default ExpenseList;
