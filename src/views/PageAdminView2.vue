<template>
      <page-layout :alertButtons="alertPropsConfig.alertButtons" :alertMessage="alertPropsConfig.alertHeader"
            :alertSubHeader="alertPropsConfig.alertSubHeader" :alertHeader="alertPropsConfig.alertHeader"
            :isAlertOpen="vm.isAlertOpen" pageTitle="Upload Iamges">
            <load-images-create-pdf :alertHandler="actions.alertHandler"
                  :controlModalVisibility="actions.controlModalVisibility"
                  acceptFiles="image/*"></load-images-create-pdf>
            <modal-dynamic :controlModalVisibility="actions.controlModalVisibility"
                  :closeModalHandler="actions.closeModalHandler" :isModalOpen="vm.isModalOpen">
                  <ion-img :src="selectedImage" v-if="selectedImage"></ion-img>
            </modal-dynamic>
            <!-- <fab-controllers></fab-controllers> -->
      </page-layout>
</template>

<script setup type="ts">
import { IonImg, onIonViewDidEnter } from '@ionic/vue'
import LoadImagesCreatePdf from '@/components/loadImagesCreatePdf.vue';
import pageLayout from '@/components/pageLayout.vue';
import ModalDynamic from '@/components/modalDynamic.vue';
// import FabControllers from '@/components/fabComp.vue'
import { reactive, ref } from 'vue';

const selectedImage = ref('');

const alertPropsConfig = reactive({
      alertHeader: '',
      alertSubHeader: '',
      alertMessage: '',
      alertButtons: ['OK']
});

const vm = reactive({
      isModalOpen: false,
      isAlertOpen: false
});

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

actions.alertHandler = ({ title, subTitle, message }) => {
      vm.isAlertOpen = true;
      alertPropsConfig.alertHeader = title;
      alertPropsConfig.alertSubHeader = subTitle;
      alertPropsConfig.alertMessage = message;
};

actions.controlAlertVisibility = (alertVisibility) => {
      vm.isAlertOpen = alertVisibility;
};

onIonViewDidEnter(()=>{
    console.log('PageAdminView3 in dom')
});

</script>