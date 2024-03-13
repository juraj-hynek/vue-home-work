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

      const dataJson = await response.json();
      store.commit("setUsers", { data: dataJson.data });
      console.log("updateUser response", dataJson);
    } catch (error) {
      //
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
    }
  };

  const login = async (formState) => {
    try {
      store.commit("setLoading", true);
      const response = await fetch(`${URL_BASE}/login`, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log('data', data)

   
    } catch (error) {
      console.error("Error logging in:", error.message);
      store.commit("setUserLoginStatus", false);
    } finally {
      store.commit("setLoading", false);
    }
  };

  return {
    updateUser,
    fetchUsers,
    login,
  };
};
