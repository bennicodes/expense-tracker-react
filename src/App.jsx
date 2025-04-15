import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    setExpenses(parsedExpenses);
  }, []);

  // Function to add a new expense
  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Function to edit an expense
  const editExpense = (updatedExpense) => {
    const normalizedExpense = {
      ...updatedExpense,
      date: new Date(updatedExpense.date).toISOString(),
    };

    const updatedExpenses = expenses.map((expense) =>
      expense.id === normalizedExpense.id ? normalizedExpense : expense
    );

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Open modal function
  const openModal = () => setIsModalOpen(true);

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  // Function to start editing an expense
  const startEditing = (expense) => {
    setEditingExpense(expense);
    openModal();
  };

  return (
    <div className={styles.rootContainer}>
      <Dashboard openModal={openModal} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <Form
            closeModal={closeModal}
            addExpense={addExpense}
            editExpense={editExpense}
            initialExpense={editingExpense}
          />
        </Modal>
      )}
      <ExpenseList expenses={expenses} onEdit={startEditing} />
    </div>
  );
}

export default App;
