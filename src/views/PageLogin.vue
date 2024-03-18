<template>
  <page-layout pageTitle="Login" :toastMessage="vmToastMessage" :isToastOpen="vmToastOpen"
    :controlToastVisibility="controlToastVisibility">
    <ion-item>
      <ion-label position="floating">Username</ion-label>
      <ion-input id="username" @ionInput="ionInputHandler('username', $event.target.value)" type="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input id="password"  @ionInput="ionInputHandler('password', $event.target.value)" type="password"></ion-input>
    </ion-item>
    <ion-button :disabled="isButtonLocked" expand="full" @click="handleLogin">Login</ion-button>
  </page-layout>
</template>

<script setup>
import { IonLabel, IonItem, IonInput, IonButton, } from '@ionic/vue'
import PageLayout from '@/components/pageLayout.vue';
import { reactive, ref } from 'vue';
import { useUserActions } from '@/store/asyncActions';
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

// Promise-based delay function
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const { login } = useUserActions();
const router = useRouter();


const vmToastOpen = ref(false);
const vmToastMessage = ref("");

const formState = reactive({
  username: 'John',
  password: '123321',
});

const ionInputHandler = (inputName, value) => {
  // formState[inputName] = value; make unit test complains
  if (inputName === 'username') {
    formState.username = value
  } else {
    formState.password = password
  }
};


const handleLogin = async () => {
  try {
    vmToastOpen.value = true;
    await login(formState);

    const isAdmin = Boolean(Cookies.get('isAdmin'));
    const isUser = Boolean(Cookies.get('isUser'));

    let redirectTo = '/';
    if (isAdmin) {
      redirectTo = '/admin-dashboard';
    } else if (isUser) {
      redirectTo = '/user-dashboard';
    }

    // Display "Moment ..." message
    vmToastMessage.value = "Moment ...";

    // Wait for 2 seconds before redirecting
    await delay(2000);

    // Close toast and redirect
    vmToastOpen.value = false;
    router.push(redirectTo);
  } catch (error) {
    vmToastOpen.value = true;
    vmToastMessage.value = error.message;
  }
};

const controlToastVisibility = () => {
  console.log('page toast is dismissed');
};


const isButtonLocked = formState.username.length === "" || formState.password.length === ""
</script>


<!-- function createComunicatror(url = '', key = '') {
  return new class {
    constructor() {}

    async request() {
      const request = await fetch('http://locahost:3000/users', {
        method: 'POST',
        body: JSON.stringify({})
      });
      const data = await request.json();
    }

    select(...params) {
      return this;
    }
    eq() {
      return this;
    }
  }
}

const httpComunicator = createComunicatror();

{
  const { data, loading, error } = httpComunicator.from('/users')
    .select('*')
    .select('name', 'email');

  // .eq('age', 30);
}

{
  const { data, loading, error } = httpComunicator.from('/users')
    .delete('*');
}
{
  const { data, loading, error } = httpComunicator.from('/users')
    .update({})
    .match({ id: 1 });
}

{
  const { data, loading, error } = httpComunicator.from('/login')
    .login({})

}
{
  const { data, loading, error } = httpComunicator.from('/logout')
    .login({})
} -->
