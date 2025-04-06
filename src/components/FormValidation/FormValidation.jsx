import { useState } from "react";

const FormValidation = () => {
  const [error, setError] = useState("");

  const validate = (expense) => {
    if (!expense.name.trim()) {
      setError("Please enter a name for the expense.");
      return false;
    }

    // Make sure amount is provided and is a number
    if (!expense.amount || isNaN(expense.amount)) {
      setError("Please enter a valid amount.");
      return false;
    }

    if (!expense.date || isNaN(new Date(expense.date).getTime())) {
      setError("Please enter a valid date.");
      return false;
    }

    if (!expense.category) {
      setError("Please select a category.");
      return false;
    }

    setError("");
    return true;
  };
  const clearError = () => setError("");

  return { error, validate, clearError };
};

export default FormValidation;
