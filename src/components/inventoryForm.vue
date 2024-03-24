<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Inventory Form</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Item Name</ion-label>
            <ion-input v-model="formData.itemName"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Temperature</ion-label>
            <ion-select v-model="formData.condition">
              <ion-select-option value="storage1">Temperature 1</ion-select-option>
              <ion-select-option value="storage2">Temperature 2</ion-select-option>
              <ion-select-option value="storage3">Temperature 3</ion-select-option>
              <ion-select-option value="storage4">Temperature 4</ion-select-option>
              <ion-select-option value="storage5">Temperature 5</ion-select-option>
              <ion-select-option value="storage6">Temperature 6</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Storage</ion-label>
            <ion-select v-model="formData.condition">
              <ion-select-option value="storage1">Storage 1</ion-select-option>
              <ion-select-option value="storage2">Storage 2</ion-select-option>
              <ion-select-option value="storage3">Storage 3</ion-select-option>
              <ion-select-option value="storage4">Storage 4</ion-select-option>
              <ion-select-option value="storage5">Storage 5</ion-select-option>
              <ion-select-option value="storage6">Storage 6</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating">SKU</ion-label>
            <ion-input v-model="formData.sku"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">LOT</ion-label>
            <ion-input v-model="formData.lot"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Pallete Qty</ion-label>
            <ion-input type="number" v-model="formData.quantity"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Box Qty</ion-label>
            <ion-input type="number" v-model="formData.quantity"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Inner Box Qty</ion-label>
            <ion-input type="number" v-model="formData.quantity"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Unit Qty</ion-label>
            <ion-input type="number" v-model="formData.quantity"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Unit</ion-label>
            <ion-select v-model="formData.unit">
              <ion-select-option value="kg">Kilograms (kg)</ion-select-option>
              <ion-select-option value="l">Liters (L)</ion-select-option>
              <ion-select-option value="lbs">Pounds (lbs)</ion-select-option>
              <ion-select-option value="pcs">Pieces (pcs)</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Condition</ion-label>
            <ion-select v-model="formData.condition">
              <ion-select-option value="ok">OK</ion-select-option>
              <ion-select-option value="damaged">Damaged</ion-select-option>
              <ion-select-option value="lost">Lost</ion-select-option>
              <ion-select-option value="misplaced">Misplaced</ion-select-option>
              <ion-select-option value="stolen">Stolen</ion-select-option>
              <ion-select-option value="expired">Expired</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Date of Use</ion-label>
            <ion-datetime v-model="formData.dateOfUse"></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Expiry Date</ion-label>
            <ion-datetime v-model="formData.expiryDate"></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Note</ion-label>
            <ion-textarea v-model="formData.note"></ion-textarea>
          </ion-item>
          <!-- Supplier Section -->
          <ion-item-divider>
            <ion-label>Supplier Details</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label position="floating">Supplier Name</ion-label>
            <ion-input v-model="formData.supplierName"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Supplier Email</ion-label>
            <ion-input type="email" v-model="formData.supplierEmail"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Supplier Phone</ion-label>
            <ion-input type="tel" v-model="formData.supplierPhone"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Supplier Address</ion-label>
            <ion-input v-model="formData.supplierAddress"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="block" @click="submitForm">Submit</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script>
  import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/vue';
  export default {
    components: {
      IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar
    },
    data() {
      return {
        formData: {
          itemName: '',
          sku: '',
          quantity: null,
          condition: '',
          expiryDate: ''
        }
      }
    },
    methods: {
      submitForm() {
        console.log(this.formData);
        // Add logic to process and store form data here
        // For example, send this data to your backend server
      }
    }
  }
  </script>