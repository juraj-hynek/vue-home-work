<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="(tab, tabIndex) in tabsTitles" v-bind:key="tabIndex" :tab="tab.tab" :href="tab.path">
          <ion-icon :icon="tab.icon" />
          <ion-label>{{ tab.name }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { playCircle, radio, library, search, home } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';


const tabsConfig = [
  {
    name: 'UserPath1',
    path: '/user-dashboard',
    tab: 'UserPath1',
    icon: home
  },
  {
    name: 'UserPath2',
    path: '/user-path2',
    tab: 'UserPath2',
    icon: playCircle
  },
  {
    name: 'UserPath3',
    path: '/user-path3',
    tab: 'UserPath3',
    icon: radio
  }
]
export default defineComponent({
  nam: "AppRouteIndexPageUser",
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  setup() {
    const tabsTitles = ref(tabsConfig || []);
    return {
      playCircle,
      radio,
      library,
      search,
      tabsTitles
    };
  },
});
</script>