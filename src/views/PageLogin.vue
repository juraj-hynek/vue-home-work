<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input v-model="username" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button expand="block" @click="login">Login</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  
  export default defineComponent({
    name: 'LoginPage',
    setup() {
      const username = ref('');
      const password = ref('');
      const router = useIonRouter();
  
      const login = () => {
        // Your login logic goes here
        console.log('Logging in...');
        console.log('Username:', username.value);
        console.log('Password:', password.value);
  
        // Example: Navigate to home page after successful login
        router.push('/home');
      };
  
      return {
        username,
        password,
        login
      };
    }
  });
  </script>