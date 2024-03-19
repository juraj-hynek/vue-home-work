<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Search</ion-title>
          <ion-progress-bar v-if="false" type="indeterminate"></ion-progress-bar>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div class="example-content">Search content</div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar, onIonViewDidEnter } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'PageUserView2',
      components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar },
    });

    onIonViewDidEnter(() => {
  console.log('PageUserView3 in dom')
});
  </script>
  <style scoped>
    .example-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  </style>