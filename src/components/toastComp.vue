<template>
    <ion-button id="open-toast" expand="block">Open</ion-button>
    <p>This toast example uses triggers to automatically open a toast when the button is clicked.</p>
    <ion-toast trigger="open-toast" message="This toast will disappear after 5 seconds" :duration="5000"></ion-toast>
</template>

<script setup lang="ts">
import { IonButton, IonToast } from '@ionic/vue';


</script>