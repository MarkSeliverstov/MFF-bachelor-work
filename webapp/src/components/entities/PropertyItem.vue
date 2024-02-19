<template>
    <div>
        <li v-if="showProperty" @click="toggleProperty">
            <p>
                Name: {{ property.name }}
                <span v-if="propertyVisible" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </p>
        </li>
        <ul v-if="showProperty && propertyVisible">
            <li>Description: {{ property.description }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['property'],
    data() {
        return {
            showProperty: true,
            propertyVisible: false
        };
    },
    methods: {
        toggleProperty() {
            this.propertyVisible = !this.propertyVisible;
        }
    }
};
</script>


<style scoped>
li {
    list-style: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding-left: 3rem;
}

.toggle-icon {
    margin-left: 1rem;
}

</style>

