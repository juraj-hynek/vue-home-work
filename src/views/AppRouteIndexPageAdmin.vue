<template>
  <page-layout pageTitle="Admin">
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

<script setup lang="js">
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, onIonViewDidEnter } from '@ionic/vue';
import { playCircle, radio, home } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pageLayout from '@/components/pageLayout.vue';
import { useUserActions } from '@/store/asyncActions';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to the WebSocket server


const { fetchUsers } = useUserActions();

const tabsConfig = [
  {
    name: 'AdminPath1',
    path: '/admin-dashboard',
    tab: 'AdminPath1',
    icon: home
  },
  {
    name: 'AdminPath2',
    path: '/admin-path2',
    tab: 'AdminPath2',
    icon: playCircle
  },
  {
    name: 'AdminPath3',
    path: '/admin-path3',
    tab: 'AdminPath3',
    icon: radio
  }
]

const router = useRouter();
const tabsTitles = ref(tabsConfig || []);

const fetchData = (async () => {
  try {
    const request = await fetchUsers();
    console.log('request', request);
    if (!request) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  } catch (error) {
    console.log(error.message);
  }
});


onIonViewDidEnter(() => {
  fetchData();
  socket.on("update", (updatedData) => {
    console.log("Received updated data:", updatedData);
  });});
</script>