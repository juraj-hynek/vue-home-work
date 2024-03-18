<template>
  <page-layout pageTitle="Login" :toastMessage="appStore.state.toastMessage"
    :isToastOpen="appStore.state.isToastVisible" :controlToastVisibility="controlToastVisibility">
    <ion-item>
      <ion-label position="floating">Username</ion-label>
      <ion-input id="username" @ionInput="actions.ionInputHandler('username', $event.target.value)"
        type="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input id="password" @ionInput="actions.ionInputHandler('password', $event.target.value)"
        type="password"></ion-input>
    </ion-item>
    <ion-button :disabled="isButtonLocked" expand="full" @click="actions.handleLogin">Login</ion-button>

    <section>
      <h3>
        How to use application
      </h3>
      <ul>
        <li>
          password is 123321 (pre-setup for all users)
        </li>
        <li>
          username for admin is John
        </li>
        <li>
          username for user is Rober
        </li>
        <li>
          path for admin is /admin-dashboard
        </li>
        <li>
          path for user is /user-dashboard
        </li>
        <li>
          if unknown path is entered then error page is rendered
        </li>
        <li>
          if admin will block user (by edit button > open modal and edit status), then user will be redirected to login
          page and user's auth cookies will be deleted
        </li>
        <li>
          if admin will edit pdfImageLimit qty then user's (Rober or any user) UI (uplaod) from will be notified and new
          image limit will be set up and user might be (if select more then allowed) notified by alert about limit
        </li>
      </ul>
    </section>
  </page-layout>
</template>

<script setup>
import { IonLabel, IonItem, IonInput, IonButton, } from '@ionic/vue'
import PageLayout from '@/components/pageLayout.vue';
import { reactive } from 'vue';
import { useUserActions } from '@/store/asyncActions';
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from 'vuex';
// Promise-based delay function

const appStore = useStore();
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const { login } = useUserActions();
const router = useRouter();

const formState = reactive({
  username: 'John',
  password: '123321',
});


const actions = {};

actions.ionInputHandler = (inputName, value) => {
  // formState[inputName] = value; make unit test complains
  if (inputName === 'username') {
    formState.username = value;
  } else {
    formState.password = password;
  }
};

actions.handleLogin = async () => {
  try {
    appStore.commit('setToast', { toastState: true, toastMessage: '... Uno Momento :0)' })
    await login(formState);

    const isAdmin = Boolean(Cookies.get('isAdmin'));
    const isUser = Boolean(Cookies.get('isUser'));

    let redirectTo = '/';
    switch (true) {
      case isAdmin:
        redirectTo = '/admin-dashboard';
        break;
      case isUser:
        redirectTo = '/user-dashboard';
        break;
      default:
        break;
    }
    appStore.commit('setToast', { toastState: false });

    router.push(redirectTo);
  } catch (error) {
    appStore.commit('setToast', { toastState: true, toastMessage: error.message })
  }
  finally {
    // appStore.commit('setToast', { toastState: false, toastMessage: '' })
  }
};

actions.controlToastVisibility = () => {
  console.log('page toast is dismissed');
};




const isButtonLocked = formState.username.length === "" || formState.password.length === ""
</script>
