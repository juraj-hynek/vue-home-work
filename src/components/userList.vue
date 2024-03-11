<!-- UserList.vue -->
<template>
    <ion-list>
      <slot></slot>
    </ion-list>
  </template>
  
  <script>
  import { IonList, IonItem, IonCheckbox, IonAvatar, IonText, IonBadge, IonButton, IonIcon } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { create } from 'ionicons/icons';
  
  export default defineComponent({
    components: {
      IonList,
      IonItem,
      IonCheckbox,
      IonAvatar,
      IonText,
      IonBadge,
      IonButton,
      IonIcon
    },
    props: {
      computedUsers: {
        type: Array,
        required: true
      },
      manageStatusColor: {
        type: Function,
        required: true
      },
      selectUserToggle: {
        type: Function,
        required: true
      },
      selectUserOpenModal: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      return {
        create
      };
    }
  });
  </script>