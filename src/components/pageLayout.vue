<template>
    <ion-page>
        <ion-header v-if="true">
            <ion-toolbar>
                <!-- Left side button -->
                <ion-buttons slot="start">
                    <ion-button @click="leftButtonClick">
                        <ion-icon :icon="leftButtonIcon"></ion-icon>
                    </ion-button>
                </ion-buttons>

                <!-- Title -->
                <ion-title>{{ pageTitle }}</ion-title>

                <!-- Right side button -->
                <ion-buttons slot="end">
                    <ion-button @click="rightButtonClick">
                        <ion-icon :icon="rightButtonIcon"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-progress-bar v-if="isProgressBarOpen" type="indeterminate"></ion-progress-bar>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <slot></slot>
        </ion-content>
        <!-- <ion-modal :is-open="isModalOpen">
            <ion-header>
                <ion-toolbar>
                    <ion-title>My Modal</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="controlModalVisibility(false)">Close</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
               
                <ion-button @click="controlModalVisibility(false)">Close Modal</ion-button>
            </ion-content>
        </ion-modal> -->
        <ion-toast :is-open="isToastOpen" message="This toast will close in 5 seconds" :duration="5000"
            @didDismiss="controlToastVisibility(false)"></ion-toast>
        <ion-loading trigger="open-loading" :duration="3000" message="Dismissing after 3 seconds..."> </ion-loading>
        <ion-alert :buttons="alertButtons" :is-open="isAlertOpen" :header="alertHeader" :sub-header="alertSubHeader"
            :message="alertMessage" @didDismiss="controlAlertVisibility(false)"></ion-alert>
    </ion-page>
</template>
<script>
import { IonAlert, IonProgressBar, IonLoading, IonToast, IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageLayout',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButtons,
        IonButton,
        IonIcon,
        IonToast,
        IonProgressBar,
        IonLoading,
        IonAlert
    },
    props: {
        pageTitle: String,
        leftButtonIcon: String,
        rightButtonIcon: String,
        isModalOpen: Boolean,
        controlModalVisibility: Function,
        isToastOpen: Boolean,
        controlToastVisibility: Function,
        isProgressBarOpen: Boolean,
        isAlertOpen: Boolean,
        controlAlertVisibility: Function,
        alertHeader: String,
        alertSubHeader: String,
        alertMessage: String,
        alertButtons: Array,
        useCustomHeader: Boolean
    },
    setup() {

        const leftButtonClick = () => {
            // Emit an event or perform an action when the left button is clicked
            console.log('Left button clicked');
        };
        const rightButtonClick = () => {
            // Emit an event or perform an action when the right button is clicked
            console.log('Right button clicked');
        };
        return { leftButtonClick, rightButtonClick }
    }
});
</script>./pageLayout.vue