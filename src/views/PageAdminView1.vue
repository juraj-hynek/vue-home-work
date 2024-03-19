<template>
    <page-layout :toastMessage="appStore.state.ui.toastMessage" :isToastOpen="appStore.state.ui.isToastVisible"
        :leftButtonIcon="arrowBack" :leftButtonClick="actions.leftButtonClick"
        :rightButtonClick="actions.rightButtonClick">
        <ion-searchbar v-model="vm.searchValue" placeholder="Seach by user name, surname, status"></ion-searchbar>
        <!-- <ion-list>
            <ion-item>
                <ion-label slot="start">
                    <ion-checkbox @ionChange="actions.selectEveryUser($event.target.checked)"
                        slot="start">Select</ion-checkbox>
                </ion-label>
                <ion-label slot="end">
                    <ion-button @click="actions.toggleMultipleEditModal({ modalStatus: true })">Edit
                        multiple</ion-button>
                </ion-label>
            </ion-item>
        </ion-list> -->
        <ion-list>
            <ion-item v-for="(item, index) in userDataList" v-bind:key="index">
                <!-- <ion-checkbox v-if="true" slot="start" :checked="item['selected']"
                    @ionChange="actions.selectSingleUser(item)" /> -->
                <ion-avatar>
                    <img alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </ion-avatar>
                <ion-text>{{ item.username }}</ion-text>
                <ion-badge slot="end" :color="actions.manageStatusColor(item.status)">{{
        item.status
    }}</ion-badge>
                <ion-button slot="end" @click="
    actions.toggleSingleEditModal({ modalStatus: true, item })
        " fill="outline">
                    Edit
                    <ion-icon :icon="create"></ion-icon>
                </ion-button>
            </ion-item>
        </ion-list>
        <div>
            <ion-modal :is-open="appStore.state.ui.isModalOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal</ion-title>
                        <ion-buttons slot="end">
                            <ion-button
                                @click="actions.toggleSingleEditModal({ modalStatus: false, item: {} })">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <user-admin-form></user-admin-form>
            </ion-modal>
            <!-- <ion-modal :is-open="vm.isOpenMultipleEditModal">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal</ion-title>
                        <ion-buttons slot="end">
                            <ion-button
                                @click="actions.toggleMultipleEditModal({ modalStatus: false})">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <modal-form-multiple-user-edit></modal-form-multiple-user-edit>
            </ion-modal> -->
        </div>
        <!-- </ion-content> -->
    </page-layout>
</template>

<script setup>
import {
    IonText,
    IonSearchbar,
    IonBadge,
    IonIcon,
    IonAvatar,
    IonItem,
    IonList,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    onIonViewDidEnter
} from "@ionic/vue";
import { create } from "ionicons/icons";
import UserAdminForm from "@/components/userAdminForm.vue";
import PageLayout from "@/components/pageLayout.vue";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { arrowBack } from 'ionicons/icons';
import router from "@/router";

const appStore = useStore();

const vmPage = reactive({
    isToastOpen: false,
    toastMessage: 'Moment ..',
});

const vm = reactive({
    ispenSingleEditModal: false,
    isOpenMultipleEditModal: false,
    selectedUsersForEdit: [],
    selectedOneUser: {},
    searchValue: '',
    isMultyUserCheckerOn: false
});

const actions = {};

actions.openToastModal = (value) => {
    vmPage.isToastOpen = value;
    vmPage.toastMessage = 'Moment ...'
};

actions.toggleSingleEditModal = ({ modalStatus, item = {} }) => {
    appStore.commit('setModal', { modalStatus: modalStatus })
    appStore.commit('selectUser', item);
};

actions.toggleMultipleEditModal = ({ modalStatus }) => {
    vm.isOpenMultipleEditModal = modalStatus;
};

actions.selectSomeUsers = () => {
    appStore.commit('selectSomeUsers', user);
};


actions.selectEveryUser = (checked) => {
    console.log('selectEveryUser', checked)
    appStore.commit('selectEveryUser', true);
};

actions.selectSingleUser = (user) => {
    appStore.commit('selectUser', user);
};


actions.manageStatusColor = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'PRIMARY';

        case "PAUSED":
            return ''
        case "BLOCKED":
            return "DANGER"

        default:
            return 'PRIMARY'
    }
};
actions.searchInUsers = () => {
    const lowerCaseQuery = vm.searchValue.toLowerCase().trim();
    return appStore.state.user.users.filter(obj => {
        for (const prop in obj) {
            if (lowerCaseQuery === '' || Object.prototype.hasOwnProperty.call(obj, prop)) {
                const value = obj[prop];
                if (typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery)) {
                    return true; // If any property contains the query, return true
                }
            }
        }
        return false; // If no property contains the query, return false
    });
};
actions.rightButtonClick = () => {
    alert();
};

actions.leftButtonClick = () => {
    router.push('/login')
};
const userDataList = computed(actions.searchInUsers);

onIonViewDidEnter(()=>{
    console.log('PageAdminView1 in dom')
});
</script>

<style scoped></style>
