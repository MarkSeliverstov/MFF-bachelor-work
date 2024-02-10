<template>
    <div>
        <li v-if="showInstance" @click="toggleInstance">
            <p>
                Instance name: {{ instance.name }}
                <span v-if="instanceVisible" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </p>
        </li>
        <ul v-if="showInstance && instanceVisible">
            <li>Name: {{ instance.name }}</li>
            <li>Source: {{ instance.source }}</li>
            <li>Description: {{ instance.description }}</li>
            <li @click="toggleProperty">
                Properties
                <span v-if="showProperties" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </li>
            <ul v-if="showProperties">
                <Property v-for="(property, index) in instance.properties" :key="index" :property="property" />
            </ul>
            <li @click="toggleMethods">
                Methods
                <span v-if="showMethods" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </li>
            <ul v-if="showMethods">
                <Property v-for="(method, index) in instance.methods" :key="index" :property="method" />
            </ul>        
        </ul>
    </div>
</template>

<script>
import Property from "./PropertyItem.vue"

export default {
    components: {
        Property
    },
    props: ['instance'],
    data() {
        return {
            showInstance: true,
            showProperties: false,
            showMethods: false,
            instanceVisible: false
        };
    },
    methods: {
        toggleInstance() {
            this.instanceVisible = !this.instanceVisible;
        },
        toggleProperty() {
            this.showProperties = !this.showProperties;
        },
        toggleMethods() {
            this.showMethods = !this.showMethods;
        }
    }
};
</script>
