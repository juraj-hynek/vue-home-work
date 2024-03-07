<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Image Upload</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-alert :is-open="isOpen" header="" sub-header="" :message="message" :buttons="alertButtons"
                @didDismiss="setOpen(false)"></ion-alert>

            <!-- <AlertButton :buttonText="buttonText" :isOpen="isOpen" @update:isOpen="isOpen = $event" /> -->
            <ion-button v-if="imageUrls.length > 0" @click="convertToPDF">Convert to PDF</ion-button>
            <input multiple type="file" accept="image/*" @change="handleFileUpload" />
            <ion-list>
                <ion-item v-for="(image, index) in imageUrls" :key="index">
                    <ion-img :src="image" v-if="image"></ion-img>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
// import AlertButton from '../components/alertComp.vue'
import { IonList, IonItem, IonImg, IonAlert } from '@ionic/vue';
import { ref } from 'vue';
import jsPDF from 'jspdf';

// State
const imageUrls = ref([]);
// const isOpen = ref(false);
const isOpen = ref(false);

const alertButtons = ['OK'];
let message = "";


const setOpen = _setOpen;
const handleFileUpload = _handleFileUpload;
const convertToPDF = _convertPdf;


function _setOpen(state) {
    isOpen.value = state;
}

function _convertPdf() {
    if (!imageUrls.value.length) {
        // isOpen.value = true;
        setOpen(true);
        return;
    }

    const doc = new jsPDF();

    imageUrls.value.forEach((imageUrl, index) => {
        const img = new Image();
        img.src = imageUrl;
        const width = doc.internal.pageSize.getWidth() - 20;
        const height = (img.height * width) / img.width;
        if (index !== 0) {
            doc.addPage();
        }
        doc.addImage(imageUrl, 'JPEG', 10, 10, width, height);
    });
    doc.save('images.pdf');
}

function _handleFileUpload(event) {
    const files = event?.target?.files || [];
    if (!files.length) return;
    if (files.length > 2) {
        message = "You can upload only 2 images";
        setOpen(true);
        imageUrls.value = [];
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
            alert('Please upload image files only.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            imageUrls.value.push(reader.result);
        };
        reader.readAsDataURL(file);
    }
}


</script>