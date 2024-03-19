<template>
    <ion-content class="ion-padding">
        <ion-list>
            <ion-item>
                <ion-select :value="formData.status" @ionChange="handleChange('status', $event.target.value)"
                    label="User Status" placeholder="">
                    <ion-select-option v-for="(item, index) in statusOptions" v-bind:key="index"  value="item">{{item}}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-range :value="formData.pdfImageLimit"
                    @ionInput="handleChange('pdfImageLimit', $event.target.value)" label-placement="start"
                    label="PDF Image limit"></ion-range>
                <span>{{ formData.pdfImageLimit }}</span>
            </ion-item>
        </ion-list>
    </ion-content>
    <ion-footer>
        <ion-toolbar>
            <ion-button expand="full" @click="submitForm()">Save changes</ion-button>
        </ion-toolbar>
    </ion-footer>
</template>

<script setup type="ts">
import { IonContent, IonList, IonItem, IonSelect, IonSelectOption, IonRange, IonFooter, IonToolbar, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const statusOptions = ['ACTIVE', 'PAUSED', 'BLOCKED'];

const appStore = useStore();

// Initialize form data
const formData = ref({
   
});

// Handle input change
const handleChange = (field, value) => {
    formData.value[field] = value;
};

// Form submission logic
const submitForm = () => {
    //appStore.commit('updateMultipleusers', formData.value);
};
</script>