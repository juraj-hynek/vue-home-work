<template>
    <ion-content class="ion-padding">
        <!-- <div>
            {{ JSON.stringify(formData, null, 2) }}
        </div> -->
        <ion-list>
            <ion-item>
                <ion-avatar>
                    <img alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </ion-avatar>
                <ion-label slot="end"> #{{formData.id}}</ion-label>
            </ion-item>
            <ion-item>
                <ion-input :value="formData.name" @ionInput="handleChange('name', $event.target.value)"
                    label="name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :value="formData.surname" @ionInput="handleChange('surname', $event.target.value)"
                    label="surname"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select :value="formData.status" @ionChange="handleChange('status', $event.target.value)"
                    label="User Status" placeholder="">
                    <ion-select-option value="ACTIVE">ACTIVE</ion-select-option>
                    <ion-select-option value="PAUSED">PAUSED</ion-select-option>
                    <ion-select-option value="BLOCKED">BLOCKED</ion-select-option>
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
            <ion-button slot="end" @click="submitForm()">Save changes</ion-button>
        </ion-toolbar>
    </ion-footer>
</template>

<script setup type="ts">
import { IonAvatar, IonInput, IonContent, IonList, IonItem, IonSelect, IonSelectOption, IonRange, IonFooter, IonToolbar, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const appStore = useStore();

// Initialize form data
const formData = ref({
    ...appStore.state.selectedUser
});

// Handle input change
const handleChange = (field, value) => {
    formData.value[field] = value;
};

// Form submission logic
const submitForm = () => {
    appStore.commit('updateUser', formData.value);
};
</script>