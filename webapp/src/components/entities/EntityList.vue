<template>
    <h1>Entities View</h1>
    <ul>
        <Entity v-for="(entity, index) in jsonData.entities" :key="index" :entity="entity" />
    </ul>
    <p v-if="loading">Loading entities...</p>
</template>

<script>
import Entity from './EntityItem.vue';

export default {
    components: {
        Entity
    },
    data() {
        return {
            jsonData: {},
            loading: true
        };
    },
    beforeMount() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const url = "http://127.0.0.1:5000/model"; 
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.jsonData = data;
                this.loading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    }
};
</script>


