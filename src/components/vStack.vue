<!-- VStack.vue -->

<template>
    <div class="vstack">
        <slot></slot>
    </div>
</template>

<style scoped>
.vstack {
    display: flex;
    flex-direction: column;
}
</style>