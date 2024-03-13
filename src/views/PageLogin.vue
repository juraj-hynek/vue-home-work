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

    <!-- <ion-segment @ionChange="ionInputHandler('role', $event.target.value)" value="buttons">
      <ion-segment-button value="admin/login">
        <ion-label>Admin</ion-label>
      </ion-segment-button>
      <ion-segment-button value="user/login">
        <ion-label>USER</ion-label>
      </ion-segment-button>
    </ion-segment> -->
  </page-layout>
</template>

<script setup>
import { IonLabel, IonItem, IonInput, IonButton, IonSegment, IonSegmentButton } from '@ionic/vue'
import PageLayout from '@/components/pageLayout.vue';
import { onMounted, reactive, ref } from 'vue';
import { useUserActions } from '@/store/asyncActions';
import { useRouter } from "vue-router";
import { deleteAuthCokie } from '@/router';
import Cookies from "js-cookie";

const { login } = useUserActions();
const router = useRouter();


const formState = reactive({
  username: 'John',
  password: '123321',
  // role: ''
});

const ionInputHandler = (inputName, value) => {
  console.log(inputName, value)
  formState[inputName] = value;
};

const handleLogin = async () => {
  try {
    // Dispatch login action to Vuex store
    await login(formState);

    const isAdmin = Boolean(Cookies.get('isAdmin'));
    const isUser = Boolean(Cookies.get('isUser'));

    if (isAdmin) {
      router.push('/admin-dashboard')
    } else if (isUser) {
      router.push('/user-dashboard')
    }
    else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

onMounted(() => {
  console.log('PageLogin')
})

</script>