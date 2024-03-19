<template>
  <page-layout>
    <div>
      <button @click="demos.updateDOM">UPDATE DOM</button>
      <div ref="domElement">
        Init div content
      </div>

      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            Front Card
          </div>
          <div class="flip-card-back">
            Back Content
          </div>
        </div>
      </div>
      <div class="container">
        <div class="box box1">Box 1</div>
        <div class="box box2">Box 2</div>
      </div>
    </div>
    <some-temp></some-temp>
  </page-layout>
</template>

<script setup type="ts">
import pageLayout from '@/components/pageLayout.vue';
import { onIonViewDidEnter } from '@ionic/vue';
import { defineComponent, ref } from 'vue';



</script>
<style scoped></style>
