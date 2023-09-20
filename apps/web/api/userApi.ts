import axios from "axios";

export const onAddMovement = async (
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

export const onAddExpense = async (
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

export const onDeleteExpense = async (
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

export const onDeleteMovement = async (
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
