<template>
  <page-layout :alertButtons="alertPropsConfig.alertButtons" :alertMessage="alertPropsConfig.alertHeader"
    :alertSubHeader="alertPropsConfig.alertSubHeader" :alertHeader="alertPropsConfig.alertHeader"
    :isAlertOpen="vm.isAlertOpen" pageTitle="Upload Iamges">
    <div>
      <button @click="demos.updateDOM">UPDATE DOM</button>
      <div ref="domElement">
        Init div content
      </div>
    </div>

  </page-layout>
</template>

<script setup type="ts">
import pageLayout from '@/components/pageLayout.vue';
import { reactive, ref } from 'vue';
import { onIonViewDidEnter } from '@ionic/vue'


const domElement = ref(null);

const demos = {}
demos.updateDOM = () => {
  if (domElement.value) {
    domElement.value.textContent = "Updated div";
    domElement.value.style.border = "1px solid red";
    domElement.value.style.color = 'red';
    domElement.value.style.transition = 'transform 0.5s ease-in-out'; // Adjust duration and easing as needed
    domElement.value.style.transform = 'scale(1.2)'; // Scale factor for the animation
  }

  setTimeout(() => {
    domElement.value.style.transition = 'transform 0.5s ease-in-out'; // Adjust duration and easing as needed
    domElement.value.style.transform = 'scale(1)'; // 
  }, 1000)
}


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
onIonViewDidEnter(() => {
  console.log('PageAdminView3 in dom')
});

</script>