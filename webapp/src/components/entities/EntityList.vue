<template>
    <h1>Entities View</h1>
    <ul>
        <Entity v-for="(entity, index) in jsonData.entities" :key="index" :entity="entity" />
    </ul>
</template>

<script>
import Entity from './EntityItem.vue';
import jsonData from "@/assets/model.json";
export default {
    components: {
        Entity
    },
    data() {
        return {
            jsonData
        };
    },
};
</script>
