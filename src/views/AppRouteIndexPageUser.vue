<template>
  <page-layout pageTitle="User Page">
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
import { ref, onMounted, reactive } from 'vue';
// import { useRoute } from 'vue-router';
import PageLayout from '@/components/pageLayout.vue';
import { io } from "socket.io-client";
import { useRouter } from 'vue-router';
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

onMounted(() => {
  // Listen for updates from the server
  socket.on("update", (updatedData) => {
    // Update your Vue component with the received data
    // console.log("Received updated data:", updatedData);
    // Update your Vue component state or trigger a function to update UI
    if (updatedData.user.status === "BLOCKED") {
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  });
});

onIonViewDidEnter(() => {
  console.log('onIonViewDidEnter PU')
})
</script>