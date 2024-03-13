<template>
    <page-layout :alertButtons="alertPropsConfig.alertButtons" :alertHeader="alertPropsConfig.alertHeader"
        :alertSubHeader="alertPropsConfig.alertSubHeader" :alertMessage="alertPropsConfig.alertMessage"
        :isAlertOpen="isAlertOpen" :controlAlertVisibility="controlAlertVisibility"
        :isProgressBarOpen="isProgressBarOpen" :controlToastVisibility="controlToastVisibility"
        :isToastOpen="isToastOpen" :isModalOpen="isModalOpen" :controlModalVisibility="controlModalVisibility"
        pageTitle="Upload Images and create PDF file">

        <ion-buttons>
            <ion-buttons slot="secondary">
                <ion-button>
                    <label class="flex">
                        <ion-icon slot="icon-only" :icon="cloudUpload"></ion-icon>
                        Upload image(s)
                        <input class="hidden" multiple type="file" :accept="acceptFiles" @change="handleFileUpload" />
                    </label>
                </ion-button>
                <ion-button slot="end" v-if="isButtoMakePDFVisible" @click="convertToPDF">Convert to PDF</ion-button>
            </ion-buttons>
        </ion-buttons>
        <ion-grid>
            <ion-row>
                <ion-col size="6" size-md="4" size-lg="2" @click="controlModalVisibility({ modalStatus: true, image })"
                    v-for="(image, index) in imageUrls" :key="index">
                    <ion-img :src="image" v-if="image"></ion-img>
                </ion-col>
            </ion-row>
        </ion-grid>
        <modal-dynamic :closeModalHandler="closeModalHandler" modalTitle="Some modal title"
            :controlModalVisibility="controlModalVisibility" :isModalOpen="isModalOpen">
            <ion-img :src="selectedImage" v-if="selectedImage"></ion-img>
        </modal-dynamic>
    </page-layout>
</template>

<script setup>
import { IonGrid, IonRow, IonCol, IonImg, IonButton, IonButtons } from '@ionic/vue';
import { cloudUpload } from 'ionicons/icons';

import PageLayout from '@/components/pageLayout.vue';
import ModalDynamic from '@/components/modalDynamic.vue';
import { ref, } from 'vue';
import jsPDF from 'jspdf';

// State
const imageUrls = ref([]);
// const isOpen = ref(false);
const isModalOpen = ref(false);
// const isModalDismissed = ref(false);
const isToastOpen = ref(false);
const isLoaderOpen = ref(false);
const isProgressBarOpen = ref(false);
const isAlertOpen = ref(false);

const selectedImage = ref('')

/**
 * ALERT TITLES
 */

const alertPropsConfig = ref({
    alertHeader: '',
    alertSubHeader: '',
    alertMessage: '',
    alertButtons: ['OK']
});
/**
 * 
 * CONSTANTS
 */
const acceptFiles = "image/*";
const MESSAGE_IMAGES_NOT_UPLOADED = 'No images to upload and convert';
const MESSAGE_IMAGE_QTY_LMITATION = 'Image uploading is limited to 2 images only, Sorry'

const isButtoMakePDFVisible = imageUrls.value.length > 0
/**
 * CONSTANTS - END
 */

const controlToastVisibility = (...value) => {
    isToastOpen.value = value[0];
};

const controlModalVisibility = async ({ modalStatus = false, image = '' }) => {

    isModalOpen.value = modalStatus;
    selectedImage.value = image;
};
/**
 * 
 * const controlProgressBarVisibility = (value) => {
    isProgressBarOpen.value = value;
};
 */

const controlAlertVisibility = ({ modalStatus, alertMessage }) => {
    isAlertOpen.value = modalStatus;
    alertPropsConfig.value.alertMessage = alertMessage;
};

const closeModalHandler = () => {
    // isModalDismissed.value = true;
    isModalOpen.value = false;
};


const handleFileUpload = _handleFileUpload;
const convertToPDF = _convertImagesToPdf;


function _convertImagesToPdf() {
    if (!imageUrls.value.length) {
        controlAlertVisibility({ modalStatus: true, alertMessage: MESSAGE_IMAGES_NOT_UPLOADED });
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
function _handleFileUpload({ target }) {
    const files = target?.files || [];
    console.log(files.length)

    /**
     * VALIDATION
     */

    if (!files.length) {
        console.warn('_handleFileUpload files has not length prop');
        return;
    }
    /**
    * VALIDATION + LIMITATION FOR IMAGES QTY TO UPLOAD LATER
    */
    if (files.length > 10) {
        controlAlertVisibility({ modalStatus: true, alertMessage: MESSAGE_IMAGE_QTY_LMITATION });
        return;
    }

    /**
     * CONVERT UPLOADED IMAGES INTO DATA STRUCTURE
     */
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => imageUrls.value.push(reader.result);
        reader.readAsDataURL(file);
    }
}

// watch(isModalOpen, (nextValue, prevValue) => {
//     console.log('ahoj', isModalOpen.value);
// })

</script>
<style scoped>
.flex {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.hidden {
    visibility: hidden;
}
</style>

// if (!file.type.startsWith('image/')) {
// alert('Please upload image files only.');
// return;
// }