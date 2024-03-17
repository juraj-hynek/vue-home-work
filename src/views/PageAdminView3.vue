<template>
  <page-layout :alertButtons="alertPropsConfig.alertButtons" :alertMessage="alertPropsConfig.alertHeader"
    :alertSubHeader="alertPropsConfig.alertSubHeader" :alertHeader="alertPropsConfig.alertHeader"
    :isAlertOpen="vm.isAlertOpen" pageTitle="Upload Iamges">
  </page-layout>
</template>

<script setup type="ts">
import pageLayout from '@/components/pageLayout.vue';
import { reactive, } from 'vue';


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

const CONSTANTS = {

};

const actions = {};
actions.controlModalVisibility = ({
  modalStatus,
  item
}) => {
  vm.isModalOpen = modalStatus
  // selectedImage.value = item;
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

</script>