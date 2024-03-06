
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Detail Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div ref="videoContainer" class="fullscreen-video"></div>
            <!-- <div class="example-content">Listen now content</div> -->
            <ion-card>
                <!-- <ion-card-header> -->
                <!-- <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> -->
                <!-- <div class="video-container">
                        <video controls>
                            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div> -->



                <!-- <ion-card-title>Card Title</ion-card-title>
                    <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
                <!-- </ion-card-header> -->
                <!-- <ion-card-content>
                    <ion-list v-if="true">
                        <ion-item v-for="(item, index) in dataList" :key="index">
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
                </ion-card-content> -->
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { musicalNotes } from 'ionicons/icons';
const dataList = ref([1, 2, 3, 4, 5, 6, 7, 8]);

// const portrait = window.matchMedia("(orientation: portrait)");

const videoContainer = ref()

const setupVideo = () => {
    const video = document.createElement('video')
    //   video.src = require('@/assets/video.mp4')
    video.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.style.position = 'fixed'
    video.style.top = '0'
    video.style.left = '0'
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'

    // Append video to container
    videoContainer?.value.appendChild(video)

    // Request fullscreen mode
    video.requestFullscreen()
        .then(() => {
            console.log('Fullscreen mode enabled')
        })
        .catch(err => {
            console.error('Error enabling fullscreen mode:', err)
        })
}

onMounted(() => {
    setupVideo();
});

// onMounted(() => {
//     portrait.addEventListener("change", function (e) {
//         if (e.matches) {
//             // Portrait mode
//             console.log("Portrait mode");
//         } else {
//             // Landscape
//             console.log("Landscape mode");
//         }
//     })
// });

// onBeforeUnmount(() => {
//     portrait.removeEventListener('change', () => { });
// });

</script>
<style scoped>
/* .video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transform-origin: 0 0;
  transform: rotate(90deg) translateX(-100%);
}
.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
} */

.fullscreen-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
// https://eregpublicsecure.ksrzis.cz/Registr/RZPRO/ZdravotnickyProstredek/Detail/59127