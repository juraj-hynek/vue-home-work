<template>
  <page-layout>
     <div>This is page for Vue, css and js exploration, can get dirty or cheap looking</div>
  </page-layout>
</template>

<script setup type="ts">
import pageLayout from '@/components/pageLayout.vue';
import { onIonViewDidEnter } from '@ionic/vue'

onIonViewDidEnter(() => {
  console.log('PageAdminView3 in dom')
});

</script>
<style scoped>

</style>
