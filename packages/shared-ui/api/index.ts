import axios from "axios";

//user
export const registerUser = async (
  name: string,
  balance: number,
  refreshData: () => void
) => {
  try {
    await axios.post(`http://localhost:8000/users`, {
      name,
      balance,
    });
    refreshData(); // Refresh data after successful registration
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
export const deleteUser = async (id: string, refreshData: () => void) => {
  const URL = `http://localhost:8000/users/delete/${id}`;
  try {
    await axios.post(URL);
    refreshData(); // Refresh data after successful deletion
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

//Movement

export const addMovement = async (
  id: string,
  amount: number,
  description: string,
  refreshData: () => void
) => {
  const URL = `http://localhost:8000/users/movement/${id}`;
  try {
    await axios.post(URL, {
      amount,
      description,
    });
    refreshData(); // Refresh data after successful update
  } catch (error) {
    console.error("Error creating movement:", error);
  }
};

export const deleteMovement = async (
  userId: string,
  id: number,
  refreshData: () => void
) => {
  const URL = `http://localhost:8000/users/movement/${userId}/delete/${id}`;
  try {
    await axios.post(URL);
    refreshData(); // Refresh data after successful delete
  } catch (error) {
    console.error("Error deleting movement:", error);
  }
};

// Expense
export const addExpense = async (
  id: string,
  name: string,
  amount: number,
  description: string,
  refreshData: () => void
) => {
  const URL = `http://localhost:8000/users/expense/${id}`;
  try {
    await axios.post(URL, {
      name,
      amount,
      description,
    });
    refreshData(); // Refresh data after successful update
  } catch (error) {
    console.error("Error creating expense:", error);
  }
};

export const deleteExpense = async (
  userId: string,
  id: number,
  refreshData: () => void
) => {
  const URL = `http://localhost:8000/users/expense/${userId}/delete/${id}`;
  try {
    await axios.post(URL);
    refreshData(); // Refresh data after successful delete
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};
