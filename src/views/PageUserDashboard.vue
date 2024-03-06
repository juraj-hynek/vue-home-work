<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Image Upload</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <input label="AHoj" type="file" accept="image/*" @change="handleFileUpload" />
            <ion-img :src="imageUrl" v-if="imageUrl"></ion-img>
            <ion-img :src="imageUrl" v-if="imageUrl"></ion-img>
            <ion-img :src="imageUrl" v-if="imageUrl"></ion-img>
        </ion-content>
    </ion-page>
</template>

<script setup type="ts">
import { IonImg } from '@ionic/vue';
import { ref } from 'vue';

const imageUrl = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    // Read the image file and set the URL
    const reader = new FileReader();
    reader.onload = () => {
        imageUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
};
</script>