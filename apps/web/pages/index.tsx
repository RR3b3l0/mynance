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

  const handleUserNavigate = (id: string) => {
    router.push(`/user/${id}`);
  };

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
          {"Seems you haven't started yet, please add your information below"}
        </h1>
        <InformationForm refreshData={refreshData} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
        }}
      >
        <UserList
          users={users}
          refreshData={refreshData}
          onNavigateToUser={handleUserNavigate}
        />
      </div>
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
