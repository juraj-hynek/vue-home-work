<template>
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
            <ion-col size="6" size-md="4" size-lg="2"
                @click="controlModalVisibility({ modalStatus: true, item: image })" v-for="(image, index) in imageUrls"
                :key="index">
                <ion-img :src="image" v-if="image"></ion-img>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script type="ts">
import { IonGrid, IonRow, IonCol, IonImg, IonButton, IonButtons } from '@ionic/vue';
import { cloudUpload } from 'ionicons/icons';

import { defineComponent, ref, } from 'vue';
import jsPDF from 'jspdf';

export default defineComponent({
    name: 'LoadImagesCreatePdf',
    props: {
        controlModalVisibility: Function,
        isButtoMakePDFVisible: Boolean,
        acceptFiles: String
    },
    components: {
        IonGrid, IonRow, IonCol, IonImg, IonButton, IonButtons,
    },
    setup() {

        // State
        const imageUrls = ref([]);
        const isAlertOpen = ref(false);


        /**
         * 
         * CONSTANTS
         */

        const controlAlertVisibility = ({ modalStatus, alertMessage }) => {
            isAlertOpen.value = modalStatus;
            alertPropsConfig.value.alertMessage = alertMessage;
        };

        const handleFileUpload = _handleFileUpload;
        const convertToPDF = _convertImagesToPdf;


        function _convertImagesToPdf() {
            if (!imageUrls.value.length) {
                // controlAlertVisibility({ modalStatus: true, alertMessage: MESSAGE_IMAGES_NOT_UPLOADED });
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
        return {
            imageUrls,
            handleFileUpload,
            convertToPDF,
            cloudUpload,

        }
    }
})
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
