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
        <ion-input @ionInput="ionInputHandler('username', $event.target.value)" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input @ionInput="ionInputHandler('password', $event.target.value)" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="login">Login</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import Cookies from "js-cookie";

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const loginFormState = ref({
      username: 'John',
      password: '123321'
    });

    const router = useIonRouter();

    const ionInputHandler = (inputName, value) => {
      loginFormState.value[inputName] = value;
      console.log(inputName, value);
    }

    const login = async () => {
      // Your login logic goes here

      try {
        const response = await fetch(`http://localhost:3000/login`, {

          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginFormState.value.username,
            password: loginFormState.value.password
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        if (jsonData.user.isAdmin) {
          router.push('/admin-dashboard')
        } else {
          router.push('/user-dashboard')
        }

      } catch (error) {
        console.error("Error updating user:", error); //
        router.push('/login');
      }
      // Example: Navigate to home page after successful login
    };

    return {
      login,
      ionInputHandler
    };
  }
});
</script>

<!-- console.log('jsonData', jsonData)
console.log(Cookies.get("isAdmin"))
console.log(Cookies.get("isAuthentificated"));
console.log(Cookies.get("connect.sid")) -->
