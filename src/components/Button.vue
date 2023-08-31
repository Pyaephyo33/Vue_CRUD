<template>
    <button class="btn">{{ btnName }}</button>
</template>
<script setup>
// import {ref} from "vue";

// const btnName = ref('Demo')
defineProps({
    btnName: String,
})


</script>
<style scoped>
 .btn{
    background: bisque;
    border: 0;
    border-radius: 4px;
    padding: 5px;
    margin: 0 3px;
 }
</style>