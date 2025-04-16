import { useEffect, useState } from "react";
import styles from "./App.module.css";
import CategoryTabs from "./components/CategoryTabs/CategoryTabs";
import Dashboard from "./components/Dashboard/Dashboard";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";
import MonthDropdownFilter from "./components/MonthFilter/MonthDropdownFilter";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = All months

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    setExpenses(parsedExpenses);
  }, []);

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

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

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  //  Category filter + Month filter
  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      selectedCategory === "All" || expense.category === selectedCategory;

    const month = new Date(expense.date).getMonth() + 1;
    const monthMatch = selectedMonth === 0 || month === selectedMonth;

    return categoryMatch && monthMatch;
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
    openModal();
  };

  const openDeleteModal = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedExpenseId(null);
  };

  return (
    <div className={styles.rootContainer}>
      <Dashboard openModal={openModal} totalExpenses={totalExpenses} />

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

      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        expenses={expenses}
      />

      <div className={styles.heroContainer}>
        <MonthDropdownFilter
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={startEditing}
          openDeleteModal={openDeleteModal}
        />
      </div>

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
