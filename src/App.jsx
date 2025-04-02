import { useState } from "react";
import styles from "./App.module.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";

function App() {
  // Make sure the form modal is hidden
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch and set expenses from localStorage if available
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  // Add expense to the local storage
  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className={styles.rootContainer}>
      <Dashboard openModal={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <Form
          closeModal={() => setIsModalOpen(false)}
          addExpense={addExpense}
        />
      </Modal>
      <ExpenseList expenses={expenses} />
    </div>
  );
}
export default App;
