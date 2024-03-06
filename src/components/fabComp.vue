<template>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon :icon="chevronUpCircle"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button>
        <ion-icon :icon="document"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="colorPalette"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>
  
<script setup lang="ts">
import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import {
  //   chevronDownCircle,
  //   chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';


</script>