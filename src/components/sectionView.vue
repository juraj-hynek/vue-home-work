<template>
  <div class="section">
    <div class="section-header" v-if="title">{{ title }}</div>
    <div class="section-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SectionView',
  props: {
    title: String
  }
});
</script>

<style scoped>
.section {
  margin-bottom: 20px;
}
.section-header {
  font-weight: bold;
  margin-bottom: 10px;
}
/* .section-content {
} */
</style>