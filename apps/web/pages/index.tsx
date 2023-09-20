import { InformationForm, UserList } from "@mynance/shared-ui";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter for routing

export default function User({ users }) {
  const router = useRouter(); // Initialize useRouter

  // Function to refresh data
  const refreshData = async () => {
    try {
      const URL = `http://localhost:8000/users`;

      await axios.get(URL);

      router.replace(router.asPath); // Refresh the page with updated data
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    const URL = `http://localhost:8000/users/delete/${id}`;
    try {
      await axios.post(URL);
      refreshData(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUserNavigate = (id: string) => {
    router.push(`/user/${id}`);
  }

  if (users.length <= 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>
          Seems you haven't started yet, please add your information below
        </h1>
        <InformationForm
          onRegister={async ({ name, balance }) => {
            const URL = `http://localhost:8000/users`;
            try {
              await axios.post(URL, {
                name,
                balance,
              });
              refreshData(); // Refresh data after successful registration
            } catch (error) {
              console.error("Error registering user:", error);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UserList
        users={users}
        onDeleteUser={handleDeleteUser}
        onNavigateToUser={handleUserNavigate}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const URL = `http://localhost:8000/users`;

    const res = await axios.get(URL);
    const users = res.data;

    return { props: { users } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { users: [] } };
  }
}
