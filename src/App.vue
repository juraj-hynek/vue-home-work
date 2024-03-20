<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet },
  setup() {
    const popStateHandler = () => {
      //  console.log('changed')
    };

    onIonViewDidEnter(() => {
      window.addEventListener('popstate', popStateHandler);
    });

    onIonViewDidLeave(() => {
      window.removeEventListener('popstate', popStateHandler);
    });
  }
});
</script>
<style></style>