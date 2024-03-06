import { ref, onMounted } from "vue";

export default function useGetFetching() {
  const data = ref([]);
  try {
    onMounted(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((json) => (data.value = json));
    });
  } catch (error) {
    console.log("");
  }

  return { data };
}
