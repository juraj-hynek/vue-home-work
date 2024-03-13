<template>
      <page-layout pageTitle="Upload Iamges">
            <load-images-create-pdf :controlModalVisibility="actions.controlModalVisibility"
                  acceptFiles="image/*"></load-images-create-pdf>
            <modal-dynamic :controlModalVisibility="actions.controlModalVisibility"
                  :closeModalHandler="actions.closeModalHandler" :isModalOpen="vm.isModalOpen">
                  <ion-img :src="selectedImage" v-if="selectedImage"></ion-img>
            </modal-dynamic>
      </page-layout>
</template>

<script setup type="ts">
import { IonImg } from '@ionic/vue'
import LoadImagesCreatePdf from '@/components/loadImagesCreatePdf.vue';
import pageLayout from '@/components/pageLayout.vue';
import ModalDynamic from '@/components/modalDynamic.vue';
import { reactive, ref } from 'vue';

const selectedImage = ref('');

const alertPropsConfig = reactive({
      alertHeader: '',
      alertSubHeader: '',
      alertMessage: '',
      alertButtons: ['OK']
});

const vm = reactive({
      isModalOpen: false
});

const CONSTANTS = {
      MESSAGE_IMAGES_NOT_UPLOADED: 'No images to upload and convert',
      MESSAGE_IMAGE_QTY_LMITATION: 'Image uploading is limited to 2 images only, Sorry'
};

const actions = {};
actions.controlModalVisibility = ({
      modalStatus,
      item
}) => {
      vm.isModalOpen = modalStatus
      selectedImage.value = item;
};

actions.closeModalHandler = () => {
      console.log('modal closed');
};

</script>