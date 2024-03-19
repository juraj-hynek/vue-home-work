<template>
  <ion-list>
    <ion-item>
      <ion-icon aria-hidden="true" :icon="airplane" slot="start"></ion-icon>
      <ion-icon aria-hidden="true" :icon="airplane" slot="end"></ion-icon>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
  import { IonAvatar, IonItem, IonLabel, IonList, IonIcon } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { airplane, bluetooth, call, wifi } from 'ionicons/icons';

  export default defineComponent({

    components: {
      IonAvatar,
      IonItem,
      IonLabel,
      IonList,
      IonIcon,
    },
    setup() {
      return { airplane, bluetooth, call, wifi };
    },
  });
</script>