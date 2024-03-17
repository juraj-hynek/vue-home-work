<template>
    <ion-content class="ion-padding">
        <ion-list>
            <ion-item>
                <ion-avatar>
                    <img alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </ion-avatar>
                <ion-label slot="end"> #{{ formData.id }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-input :value="formData.username" @ionInput="handleChange('username', $event.target.value)"
                    label="name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :value="formData.surname" @ionInput="handleChange('surname', $event.target.value)"
                    label="surname"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select :value="formData.status" @ionChange="handleChange('status', $event.target.value)"
                    label="User Status" placeholder="">
                    <ion-select-option v-for="(item, index) in statusOptions" v-bind:key="index" :value="item">{{ item
                        }}</ion-select-option>
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
    <ion-alert :is-open="isOpen" header="Action OK" sub-header="" message="" :buttons="alertButtons"
        @didDismiss="setOpen(false)"></ion-alert>
</template>

<script setup type="ts">
import { IonAlert, IonLabel, IonAvatar, IonInput, IonContent, IonList, IonItem, IonSelect, IonSelectOption, IonRange, IonFooter, IonToolbar, IonButton } from '@ionic/vue';
import { reactive, ref, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useUserActions } from '@/store/asyncActions';

const props = defineProps({
    openToastModal: Function
});

const { updateUser } = useUserActions();
const isOpen = ref(false);

const statusOptions = ['ACTIVE', 'PAUSED', 'BLOCKED'];

const appStore = useStore();

// Initialize form data
const formData = reactive({
    ...appStore.state.selectedUser
});

const alertButtons = ['OK'];

const setOpen = (state) => {
    isOpen.value = state;
}

// Handle input change
const handleChange = (field, value) => {
    formData[field] = value;
};

// Form submission logic
const submitForm = async () => {
    props.openToastModal(true);
    try {
        await updateUser(formData);

        setTimeout(() => {
            props.openToastModal(false);
        }, 1000)
    } catch (error) {
        //
    }
};


</script>