<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Title</ion-title>
                <ion-buttons :collapse="true" slot="end">
                    <ion-button :disabled="isMultipledBtnLocked" slot="end" @click="openMultipleEditModalForm()"
                        fill="outline">
                        Edit Selected
                        <ion-icon slot="end" :icon="create"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Title</ion-title>
                    <ion-buttons :collapse="true" slot="end">
                        <ion-button :disabled="isMultipledBtnLocked" @click="openMultipleEditModalForm()">
                            Edit Selected
                            <ion-icon slot="end" :icon="create"></ion-icon></ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <!-- <ion-list>
                <ion-item v-for="(item, index) in formDescription" v-bind:key="index">
                   <ion-label>
                     <ion-text>ahoj</ion-text>
                   </ion-label>
                   <ion-label>
                    <input class="" :type="item.type" @change="change" />
                   </ion-label>
                </ion-item>
            </ion-list> -->
            <ion-searchbar v-model="searchValue" placeholder="Seach by user name, surname, status"></ion-searchbar>
            <ion-list>
                <ion-item v-for="(item, index) in computedUsers" v-bind:key="index">
                    <ion-checkbox @ionChange="selectUserToggle(item)" slot="start"></ion-checkbox>
                    <ion-avatar slot="start">
                        <img alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-text slot="start">{{ item.name }}</ion-text>
                    <ion-badge :color="manageStatusColor(item.status)" slot="start">{{ item.status }}</ion-badge>
                    <ion-button slot="end" @click="selectUserOpenModal({ user: item, modalState: true })"
                        fill="outline">
                        Edit
                        <ion-icon slot="end" :icon="create"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-list>
            <div>
                <ion-modal :is-open="isOpen">
                    <ion-header>
                        <ion-toolbar>
                            <ion-title>Modal</ion-title>
                            <ion-buttons slot="end">
                                <ion-button @click="deselectUserCloseModal">Close</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                    <user-admin-form></user-admin-form>
                </ion-modal>
                <ion-modal :is-open="isOpenMultipleEditModalForm">
                    <ion-header>
                        <ion-toolbar>
                            <ion-title>Modal</ion-title>
                            <ion-buttons slot="end">
                                <ion-button @click="closeMultipleEditModalForm()">Close</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                    <modal-form-multiple-user-edit></modal-form-multiple-user-edit>
                </ion-modal>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonSearchbar, IonBadge, IonIcon, IonCheckbox, IonAvatar, IonPage, IonItem, IonLabel, IonList, IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle } from '@ionic/vue';
import { create } from 'ionicons/icons';

import UserAdminForm from '@/components/userAdminForm.vue';
import ModalFormMultipleUserEdit from '@/components/modalFormMultipleUserEdit.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
//
const searchValue = ref('');
const appStore = useStore();
const isOpen = ref(false);
const isOpenMultipleEditModalForm = ref(false);


const openMultipleEditModalForm = () => {
    isOpenMultipleEditModalForm.value = true;
};

const closeMultipleEditModalForm = () => {
    isOpenMultipleEditModalForm.value = false;
}

const selectUserOpenModal = ({ user, modalState }) => {
    appStore.commit('selectUser', user);
    isOpen.value = modalState;
};

const deselectUserCloseModal = () => {
    appStore.commit('deselectUser');
    isOpen.value = false;
};

const selectUserToggle = (user) => {
    console.log('user', user);
    appStore.commit('selectMultipleUsers', user)
};

const computedUsers = computed(() => _searchUsers(appStore.state.users, searchValue.value));
const isMultipledBtnLocked = appStore.getters.isMultipledBtnLocked;

const manageStatusColor = (status = "") => {
    if (status === "ACTIVE") {
        return "primary";
    } else if (status === "PAUSED") {
        return "warning"
    }
    else if (status === "BLOCKED") {
        return "danger"
    }
};


function _searchUsers(users, query) {
    return users.filter(user => {
        for (const prop in user) {
            if (searchValue.value === '' || typeof user[prop] === 'string' && user[prop].toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
        return false;
    });
}

</script>

<style scoped></style>

// const formDescription = [
// {
// type: 'text',
// label: 'labe 1'
// },
// {
// type: 'number',
// label: 'labe 1'
// },
// {
// type: 'range',
// label: 'labe 1'
// },
// {
// type: 'date',
// label: 'labe 1'
// },
// {
// type: 'time',
// label: 'labe 1'
// },
// {
// type: 'checkbox',
// label: 'labe 1'
// },
// {
// type: 'radio',
// label: 'labe 1'
// }
// ]

// const change = ({ target }) => {
// const { value } = target
// }