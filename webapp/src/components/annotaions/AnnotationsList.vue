<template>
    <h1>Annotations View</h1>
    <ul>
        <Annotation v-for="(annotation, index) in jsonData.filesAnnotations" :key="index" :annotation="annotation" />
    </ul>
    <p v-if="loading">Loading entities...</p>
</template>

<script>
import Annotation from './AnnotationItem.vue';

export default {
    components: {
        Annotation
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
                const url = "http://127.0.0.1:5000/annotations"; 
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

<style scoped>

p {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
}

h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-weight: 900;
}
</style>
