<template>
  <!-- <ion-button expand="block" @click="controlModalVisibility(true)">Open</ion-button> -->
  <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="closeModalHandler">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{modalTitle}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="controlModalVisibility(false)">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot></slot>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'ModalDynamic',
  components: { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle },
  props: {
    controlModalVisibility: Function,
    isModalOpen: Boolean,
    modalTitle: String,
    closeModalHandler: Function
  },
  setup() {
    return {}
  }
})
</script>