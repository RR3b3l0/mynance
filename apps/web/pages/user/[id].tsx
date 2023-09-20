import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetail } from "@mynance/shared-ui";
import {
  onAddExpense,
  onAddMovement,
  onDeleteExpense,
  onDeleteMovement,
} from "../../api/userApi";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  const refreshData = async () => {
    try {
      const URL = `http://localhost:8000/users/${id}`;
      const response = await axios.get(URL);
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      refreshData();
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <UserDetail
        user={user}
        onAddMovement={(amount: number, description: string) => {
          if (id && typeof id == "string") {
            onAddMovement(id, amount, description, refreshData);
          }
        }}
        onAddExpense={(name: string, amount: number, description: string) => {
          if (id && typeof id == "string") {
            onAddExpense(id, name, amount, description, refreshData);
          }
        }}
        onDeleteExpense={(expenseId: number) => {
          if (id && typeof id == "string") {
            onDeleteExpense(id, expenseId, refreshData);
          }
        }}
        onDeleteMovement={(movementId: number) => {
          if (id && typeof id == "string") {
            onDeleteMovement(id, movementId, refreshData);
          }
        }}
      />
    </div>
  );
}
