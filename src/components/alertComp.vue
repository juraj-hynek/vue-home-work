<template>
    <ion-alert :is-open="isOpen" :header="header" :sub-header="subHeader" :message="message" :buttons="alertButtons"
        @didDismiss="handleDismiss"></ion-alert>
</template>

<!-- <template>
    <AlertButton :buttonText="buttonText" :isOpen="isOpen" @update:isOpen="isOpen = $event" />
  </template> -->

<script setup>
import { defineProps, defineEmits } from 'vue';
const { emit } = defineEmits(['update:isOpen']);
defineProps({
    buttonText: String,
    header: String,
    subHeader: String,
    message: String,
    isOpen: Boolean
});

const alertButtons = ['Action'];

const setOpen = (state) => {
    emit('update:isOpen', state);
};

const handleDismiss = () => {
    emit('update:isOpen', false);
};
</script>