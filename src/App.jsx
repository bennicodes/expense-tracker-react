import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Dashboard from "./components/Dashboard/Dashboard";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Form from "./components/FormModal/Form";
import Modal from "./components/Modal/Modal";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

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

  // Function to delete an expense
  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
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

  // Function to open delete modal
  const openDeleteModal = (expenseId) => {
    setSelectedExpenseId(expenseId); // Set expense ID to be deleted
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedExpenseId(null);
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
      <ExpenseList
        expenses={expenses}
        onEdit={startEditing}
        openDeleteModal={openDeleteModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        confirmDelete={() => {
          deleteExpense(selectedExpenseId);
          closeDeleteModal();
        }}
        expenseName={expenses.find((exp) => exp.id === selectedExpenseId)?.name}
        closeModal={closeDeleteModal}
      />
    </div>
  );
}

export default App;
