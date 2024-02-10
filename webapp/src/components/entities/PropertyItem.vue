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
