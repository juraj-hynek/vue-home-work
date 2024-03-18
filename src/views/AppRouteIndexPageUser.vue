<template>
  <page-layout :pageTitle="appStore.state.user.username">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="(tab, tabIndex) in tabsTitles" v-bind:key="tabIndex" :tab="tab.tab" :href="tab.path">
          <ion-icon :icon="tab.icon" />
          <ion-label>{{ tab.name }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </page-layout>
</template>

<script setup lang="ts">
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, onIonViewDidEnter } from '@ionic/vue';
import { playCircle, radio, home } from 'ionicons/icons';
import PageLayout from '@/components/pageLayout.vue';
import { io } from "socket.io-client";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const appStore = useStore();

const socket = io("http://localhost:3000"); // Connect to the WebSocket server


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
const router = useRouter();
const tabsTitles = ref(tabsConfig || []);
// const route = useRoute();

onIonViewDidEnter(() => {
  // Listen for updates from the server
  socket.on("update", (updatedUser) => {
    if (updatedUser.id === appStore.state.user.id && updatedUser.status === "BLOCKED") {
      appStore.commit('setUser', { data: {} })
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      appStore.commit('setUser', { data: updatedUser })
    }
  });
});
</script>