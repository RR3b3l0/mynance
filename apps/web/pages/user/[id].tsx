import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetail } from "@mynance/shared-ui";

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
      <UserDetail user={user} refreshData={refreshData} />
    </div>
  );
}
