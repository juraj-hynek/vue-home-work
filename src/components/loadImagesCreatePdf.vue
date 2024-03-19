<template>
    <div>
        <ion-list>
            <ion-item>
                <label>
                    <ion-icon style="font-size: 24px;" aria-hidden="true" :icon="cloudUpload" slot="start"></ion-icon>
                    <input multiple @change="handleFileUpload" type="file" accept="images/*" hidden />
                </label>
                <ion-icon  aria-hidden="true" :icon="sendSharp" slot="end"></ion-icon>
            </ion-item>
        </ion-list>
        <ion-grid>
            <ion-row>
                <ion-col size="6" size-md="4" size-lg="2"
                    @click="controlModalVisibility({ modalStatus: true, item: image })"
                    v-for="(image, index) in imageUrls" :key="index">
                    <ion-img :src="image" v-if="image"></ion-img>
                </ion-col>
            </ion-row>
        </ion-grid>

    </div>
</template>
<script type="ts">
import { IonGrid, IonRow, IonCol, IonImg, IonItem, IonList, IonIcon } from '@ionic/vue';
import { computed, defineComponent, ref, watch, } from 'vue';
import { airplane, bluetooth, call, wifi, cloudUpload, sendSharp } from 'ionicons/icons';
import jsPDF from 'jspdf';
import { useStore } from 'vuex';


export default defineComponent({
    name: 'LoadImagesCreatePdf',
    props: {
        controlModalVisibility: Function,
        isButtoMakePDFVisible: Boolean,
        acceptFiles: String,
        alertHandler: Function
    },
    components: {
        IonGrid, IonRow, IonCol, IonImg, IonItem, IonList, IonIcon


    },
    setup() {
        const appStore = useStore();

        const imageUrls = ref([]);

        const handleFileUpload = _handleFileUpload;
        const convertToPDF = _convertImagesToPdf;

        const pdfImageLimit = computed(() => appStore.state.user.pdfImageLimit)


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
            if (files.length > pdfImageLimit.value) {
                alert(`Only ${pdfImageLimit.value} images are allowed to upload`)
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
            airplane, bluetooth, call, wifi,
            sendSharp

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


<!-- <ion-row>
            <ion-col size="6">
              <ion-button>
                <label class="">
                    <ion-icon slot="icon-only" :icon="cloudUpload"></ion-icon>
                    Upload image(s)
                    <input class="hidden" multiple type="file" :accept="acceptFiles" @change="handleFileUpload" />
                </label>
              </ion-button>
            </ion-col>
            <ion-col size="6">
               
                <ion-button @click="convertToPDF">
                    <ion-icon  :icon="cloudUpload">
                
            </ion-icon>Convert to PDF</ion-button>
            </ion-col>
        </ion-row> -->