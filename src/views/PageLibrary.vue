<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Library</ion-title>
        <ion-progress-bar v-if="false" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">Library content</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PageLibrary',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar },
  });
</script>