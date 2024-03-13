import { reactive } from 'vue';

const useDataUpdate = async ({ path, dataToSend }) => {
  const state = reactive({
    result: null,
    error: null
  });

  try {
    const response = await fetch(`http://localhost:3000/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`, // Include bearer token in request headers
      },
      body: JSON.stringify(dataToSend),
      credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    state.result = jsonData;
  } catch (error) {
    console.error("Error updating data:", error);
    state.error = error;
  }

  return state;
};

export default useDataUpdate;