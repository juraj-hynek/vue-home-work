<template>
    <div>
        <page-layout :alertButtons="alertButtons" alertHeader="Juraj" alertSubHeader="Hello" alertMessage="nacka"
            :isAlertOpen="isAlertOpen" :controlAlertVisibility="controlAlertVisibility"
            :isProgressBarOpen="isProgressBarOpen" :controlToastVisibility="controlToastVisibility"
            :isToastOpen="isToastOpen" :isModalOpen="isModalOpen" :controlModalVisibility="controlModalVisibility"
            pageTitle="Juraj Hynek page">

            <ion-button @click="controlModalVisibility(true)">open moda</ion-button>
            <ion-button @click="controlToastVisibility(true)">open toast</ion-button>
            <ion-button @click="controlProgressBarVisibility(false)">close progress bar</ion-button>
            <ion-button @click="controlAlertVisibility(true)">open alert</ion-button>
            <modal-dynamic modalTitle="Some modal title" :controlModalVisibility="controlModalVisibility"
                :isModalOpen="isModalOpen">
                <dynamic-form-renderer :inputChange="inputChange"  :formState="formState" :inputs="inputs"></dynamic-form-renderer>
            </modal-dynamic>
        </page-layout>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { IonButton } from '@ionic/vue';
import PageLayout from '@/components/pageLayout.vue';
import ModalDynamic from '@/components/modalDynamic.vue';
import DynamicFormRenderer from '@/components/dynamicFormRenderer.vue';

const isModalOpen = ref(false);
const isToastOpen = ref(false);
const isLoaderOpen = ref(false);
const isProgressBarOpen = ref(false);
const isAlertOpen = ref(false);

const inputs = [
    { type: 'segment', scrollable: false, label: 'Segment', placeholder: '', labelPlacement: null, initValue: null, children: ['Option 1', 'Option 2', 'Option 3'] },
    { type: 'file', accept: 'image/*', label: 'File', placeholder: '', labelPlacement: null, initValue: null },
    { type: 'date', label: 'Date', placeholder: '', labelPlacement: null, initValue: null },
    { type: 'time', label: 'Time', placeholder: '', labelPlacement: null, initValue: null },
    { type: 'input', label: 'Default Input', placeholder: 'Enter text', labelPlacement: null, initValue: null },
    { type: 'input', label: 'Fixed Input', placeholder: 'Enter text', labelPlacement: 'fixed', initValue: null },
    { type: 'input', label: 'Stacked Input', placeholder: 'Enter text', labelPlacement: 'stacked', initValue: null },
    { type: 'input', label: 'Floating Input', placeholder: 'Enter text', labelPlacement: 'floating', initValue: null },
    {
        type: 'select', label: 'Select', placeholder: 'Make a Selection', initValue: null, options: [
            { value: '', label: 'No Game Console' },
            { value: 'nes', label: 'NES' },
            { value: 'n64', label: 'Nintendo64' },
            { value: 'ps', label: 'PlayStation' },
            { value: 'genesis', label: 'Sega Genesis' },
            { value: 'saturn', label: 'Sega Saturn' },
            { value: 'snes', label: 'SNES' }
        ]
    },
    { type: 'toggle', label: 'Toggle', initValue: null },
    { type: 'checkbox', label: 'Checkbox', initValue: null },
    { type: 'range', label: 'Range', labelPlacement: 'start', initValue: null },
    { type: 'range', label: 'Range2', labelPlacement: 'start', initValue: null },
    { type: 'list-card', label: 'Range2', labelPlacement: 'start', initValue: null }
];

const formState = inputs.reduce((accum, next) => {
    return Object.assign(accum, { [next.label]: '' })
}, {});

console.log('formState', formState)


const alertButtons = [
    {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
            console.log('Alert canceled');
        },
    },
    {
        text: 'OK',
        role: 'confirm',
        handler: () => {
            console.log('Alert confirmed');
        },
    },
];

const controlToastVisibility = (value) => {
    isToastOpen.value = value;
}

const controlModalVisibility = (value) => {
    isModalOpen.value = value
}

const controlProgressBarVisibility = (value) => {
    isProgressBarOpen.value = value;
}

const controlAlertVisibility = (value) => {
    isAlertOpen.value = value;
}

const inputChange = (value)=> {
    console.log('inputChange', value)
}


</script>