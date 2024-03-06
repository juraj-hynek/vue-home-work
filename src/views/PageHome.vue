<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Listen now</ion-title>
        <ion-progress-bar v-if="false" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <!-- <for-each :items="items">
          <template v-slot="{ item, index }">
            <div @click="showAlert(item)">{{ item }}</div>
          </template>
        </for-each> -->
        <!-- <VStack>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </VStack> -->
        <!-- <h-stack>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </h-stack> -->
      </div>
      <!-- <div>{{ isOnline }}</div> -->
      <!-- <fab-comp /> -->
      <!-- <action-sheet /> -->
      <!-- <toast-comp /> -->
      <!-- <modal-comp /> -->
      <!-- <segment-buttons /> -->
      <!-- <card-comp /> -->
      <!-- <horizontal-card-list /> -->
      <!-- <div class="example-content">Listen now content</div> -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list v-if="true">
            <!-- <ion-list-header>Albums</ion-list-header> -->
            <ion-item @click="goToDetail" v-for="(item, index) in dataList" :key="index">
              <ion-thumbnail slot="start">
                <ion-icon style="width: 100%; height: 100%" :icon="musicalNotes"></ion-icon>
              </ion-thumbnail>
              <ion-label>
                <h3> {{ item?.name || "n/a" }}</h3>
                <p>The Beatles</p>
                <p>1969</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { musicalNotes } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import ActionSheet from '@/components/actionSheet.vue';
import ToastComp from '@/components/toastComp.vue';
import ModalComp from '@/components/modalComp.vue';
import FabComp from '@/components/fabComp.vue';
import SegmentButtons from '@/components/segmentButtons.vue';
// import CardComp from '@/components/cardComp.vue';
// import HorizontalCardList from '@/components/HorizontalCardList.vue';
import useInternetConnection from '@/services/check-internet-connection';
import useGetFetching from '@/services/fetch-http-service';
//
import HStack from '@/components/hStack.vue';
import VStack from '@/components/vStack.vue';
// import Section from '@/components/SectionView.vue';
import ForEach from '@/components/ForEach.vue';

const route = useRouter();
const { isOnline } = useInternetConnection();
const { data: dataList } = useGetFetching();
const goToDetail = () => {
  route?.push('/detail');
};

onMounted(() => {
  console.log('isOnline', isOnline)
});

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function showAlert(){
  alert()
}

</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

// https://eregpublicsecure.ksrzis.cz/Registr/RZPRO/ZdravotnickyProstredek/Detail/59127