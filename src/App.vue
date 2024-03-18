<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet },
  setup() {
    const popStateHandler = () => {
    //  console.log('changed')
    };

    onMounted(() => {
      window.addEventListener('popstate', popStateHandler);
    });

    onUnmounted(() => {
      window.removeEventListener('popstate', popStateHandler);
    });

  }
});
</script>
<style></style>