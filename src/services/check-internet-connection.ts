import { ref, onMounted } from "vue";

export default function useInternetConnection() {
  const isOnline = ref(navigator.onLine);

  function updateOnlineStatus() {
    isOnline.value = navigator.onLine;
  }

  onMounted(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });

  return {
    isOnline,
  };
}
