<template>
    <ion-page>
        <ion-content class="ion-padding">
            <h1>Error</h1>
            <p>Page not found</p>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default defineComponent({
    name: 'PageError',
    components: {
        IonPage, IonContent
    }
});

</script>

<style scoped>
/* Add your styling here */
</style>