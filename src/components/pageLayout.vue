<template>
    <!-- <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">This is the menu content.</ion-content>
    </ion-menu> -->
    <ion-page id="main-content">
        <ion-header v-if="true">
            <ion-toolbar>
                <!-- Left side button -->
                <!-- <ion-menu-button></ion-menu-button> -->
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
        <ion-toast :is-open="isToastOpen" :message="toastMessage" :duration="toastDuration"
            @didDismiss="controlToastVisibility && controlToastVisibility(false)"></ion-toast>
        <!-- <ion-loading trigger="open-loading" :duration="3000" message="Dismissing after 3 seconds..."> </ion-loading> -->
        <ion-alert :buttons="alertButtons" :is-open="isAlertOpen" :header="alertHeader" :sub-header="alertSubHeader"
            :message="alertMessage" @didDismiss="controlAlertVisibility && controlAlertVisibility(false)"></ion-alert>
    </ion-page>
</template>
<script>
import { IonMenu,IonMenuButton, IonAlert, IonProgressBar, IonLoading, IonToast, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
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
        IonAlert,
        IonMenu,
        IonMenuButton
    },
    props: {
        pageTitle: String,
        leftButtonIcon: String,
        rightButtonIcon: String,
        isModalOpen: Boolean,
        controlModalVisibility: Function,
        isToastOpen: Boolean,
        toastMessage: String,
        toastDuration: Number,
        controlToastVisibility: Function,
        isProgressBarOpen: Boolean,
        isAlertOpen: Boolean,
        controlAlertVisibility: Function,
        alertHeader: String,
        alertSubHeader: String,
        alertMessage: String,
        alertButtons: Array,
        leftButtonClick: Function,
        rightButtonClick: Function
    },
    setup() {
        return {}
    }
});
</script>./pageLayout.vue