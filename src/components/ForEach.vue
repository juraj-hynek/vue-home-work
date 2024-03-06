<template>
    <div>
        <slot v-for="(item, index) in items" :item="item" :index="index" :key="index"></slot>
    </div>
</template>

<script>
export default {
    name: 'ForEach',
    props: {
        items: Array
    }
};
</script>