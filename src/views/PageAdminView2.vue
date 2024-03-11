<template>
      <ion-page>
            <ion-header :translucent="true">
                  <ion-toolbar>
                        <ion-title>Title</ion-title>
                        <!-- <ion-buttons :collapse="true" slot="end">
                    <ion-button :disabled="isEditSelectedUsersBtnUnlocked" slot="end"
                        @click="openMultipleEditModalForm()" fill="outline">
                        Edit Selected
                        <ion-icon slot="end" :icon="create"></ion-icon>
                    </ion-button>
                </ion-buttons> -->
                  </ion-toolbar>
            </ion-header>
            <ion-content>
                  <p>Page adming view 2</p>
            </ion-content>
      </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { playCircle, radio, library, search, home } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';


export default defineComponent({
      nam: "PageAdminView2",
      components: { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
      setup() {
            return {
                  playCircle,
                  radio,
                  library,
                  search,
            };
      },
});
</script>