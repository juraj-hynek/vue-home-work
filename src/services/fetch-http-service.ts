import { ref, onMounted } from "vue";

export default function useGetFetching() {
  const data = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");
  try {
    onMounted(() => {
      isLoading.value = true;
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((json) => {
          data.value = json;
          isLoading.value = false;
        });
    });
  } catch (error) {
    console.log("");
    errorMessage.value = error.message;
    isLoading.value = false;
  }

  return { data, error: errorMessage, isLoading };
}
