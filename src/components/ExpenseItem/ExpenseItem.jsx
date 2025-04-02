const ExpenseItem = () => {
  // TODO: move logic to a new file for handling expense functionality
  const createExpense = (name, category, amount, date) => {
    return {
      id: uuidv4(),
      name: name,
      category: category,
      amount: amount,
      date: new Date(date).toISOString(),
    };
  };

  return <div>ExpenseItem</div>;
};

export default ExpenseItem;
