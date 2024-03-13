<template>
  <page-layout pageTitle="Login">
    <ion-item>
      <ion-label position="floating">Username</ion-label>
      <ion-input @ionInput="ionInputHandler('username', $event.target.value)" type="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input @ionInput="ionInputHandler('password', $event.target.value)" type="password"></ion-input>
    </ion-item>
    <ion-button expand="block" @click="handleLogin">Login</ion-button>

    <ion-segment @ionChange="ionInputHandler('role', $event.target.value)" value="buttons">
      <ion-segment-button value="admin/login">
        <ion-label>Admin</ion-label>
      </ion-segment-button>
      <ion-segment-button value="user/login">
        <ion-label>USER</ion-label>
      </ion-segment-button>
    </ion-segment>
  </page-layout>
</template>

<script setup>
import { IonLabel, IonItem, IonInput, IonButton, IonSegment, IonSegmentButton } from '@ionic/vue'
import PageLayout from '@/components/pageLayout.vue';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { useUserActions } from '@/store/asyncActions';

const { login } = useUserActions();

const formState = reactive({
  username: 'John',
  password: '123321',
  role: ''
});
const router = useRouter();

const ionInputHandler = (inputName, value) => {
  console.log(inputName, value)
  formState[inputName] = value;
};

const handleLogin = async () => {
  try {
    // Dispatch login action to Vuex store
    await login(formState);
    // If login is successful, redirect the user to the /admin-dashboard path or /user-dashboard
    router.push(Cookies.get('isAdmin') === "true" ? '/admin-dashboard' : '/user-dashboard');
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

</script>