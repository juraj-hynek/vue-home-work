import { useStore } from "vuex";
const URL_BASE = `http://localhost:3000`;
const headers = {
  "Content-Type": "application/json",
};

export const useUserActions = () => {
  const store = useStore();

  const updateUser = async (dataToSend) => {
    try {
      const response = await fetch(`${URL_BASE}/users`, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      store.commit("setUsers", { data: dataJson.data });
      return dataJson; // Return the data upon successful update
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error; // Re-throw the error for catching in another async function
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${URL_BASE}/users`, {
        headers: headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      store.commit("setUsers", { data: dataJson.data });

      return dataJson;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      store.commit("setUsers", { data: [], error: error.message });
      throw error; // Re-throw the error for catching in another async function
    }
  };
  const login = async (formState) => {
    try {
      const response = await fetch(`${URL_BASE}/login`, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        // If response is not ok, throw an error with a meaningful message
        throw new Error(
          "Failed to log in. Please check your credentials and try again."
        );
      }

      const data = await response.json();

      // Update user data in the store upon successful login
      store.commit("setUser", {
        data: data.user || {},
      });

      // Return data upon successful login
      return data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error logging in:", error.message);

      // Re-throw the error for catching in another async function
      throw error;
    }
  };

  return {
    updateUser,
    fetchUsers,
    login,
  };
};
