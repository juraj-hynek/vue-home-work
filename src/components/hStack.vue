<template>
    <div class="hstack">
        <slot></slot>
    </div>
</template>

<style scoped>
.hstack {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>