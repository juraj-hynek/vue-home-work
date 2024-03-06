<template>
  <div class="page1">
    <section class="VStack Space-Between ion-padding">
      <h1>Music</h1>
      <ion-icon :icon="person" aria-label="Favorite"></ion-icon>
    </section>
    <section class="VStack Space-Between ion-padding">
      <h1>Explore</h1>
      <p>All</p>
    </section>
    <section>
      <swiper-container>
        <swiper-slide class="slider-item" v-for="item in dataList" v-bind:key="item">
          <ion-card @click="navigateTo">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <ion-card-header>
              <ion-card-title>Card Title</ion-card-title>
              <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
            </ion-card-header>
            <ion-card-content>
              Here's a small text
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper-container>
    </section>
    <section class="ion-padding">
      <section class="hstack">
        <h3>Made for you</h3>
      </section>
      <swiper-container>
        <swiper-slide class="second-swiper"  v-for="item in dataList" v-bind:key="item">
          <figure>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
             <figcaption>
                <h4>Some text</h4>
             </figcaption>
          </figure>
        </swiper-slide>
      </swiper-container>
    </section>
  </div>
</template>
<script setup type="ts">
// import function to register Swiper custom elements
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import {
  person

} from 'ionicons/icons';


import { register } from 'swiper/element/bundle';
import { useRouter } from 'vue-router';
// register Swiper custom elements

register();

const router = useRouter();
const dataList = [1, 2, 3, 4, 5];

const navigateTo = () => {
  router.push('/detail');
};
</script>
<style scoped>



.VStack {
  display: flex;
  flex-direction: row;
  padding-bottom: 0;
  padding-top: 0;
  align-items: center;
}
.HStack {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  padding-top: 0;
  align-items: center;
}

.Space-Between {
  justify-content: space-between;
}

.Space-Around {
  justify-content: space-around;
}

.Space-Evenly {
  justify-content: space-evenly;
}

.ZStack {}

.Grid {}

.List {}
.List .Header {}
.List .Footer {}
.List .ListItem {}
.Section {}
.Section .Header {}
.Section .Footer {}


.second-swiper {
  border: 1px solid;
  width: 80% !important;
  height: 120px;
  position: relative;
  margin-right: 12px;

}
.second-swiper img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.second-swiper img {
  border: 1px solid;
}
.hstack {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px !important;
  padding-bottom: 0px !important;
  align-items: center;
}


.slider-item {
  /* border: 1px solid red; */
  width: 240px !important;
}

ion-card {
  border-radius: 18px !important;
  /* box-shadow: none; */
  /* height: 340px; */
  margin-right: 18px !important;
}

ion-card img {
  height: 180px;
}
</style>