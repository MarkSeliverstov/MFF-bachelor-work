<template>
    <div class="entity-item">
        <li v-if="showEntity" @click="toggleEntity" style="font-size: 1.5rem;">
            <div>
                {{ entity.identifier }}
                <span v-if="entityVisible" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </div>
        </li>
        <ul v-if="showEntity && entityVisible" class="instance-list">
            <h3>Instances:</h3>
            <Instance v-for="(instance, index) in entity.instances" :key="index" :instance="instance" />
        </ul>
    </div>
</template>

<script>
import Instance from './InstanceItem.vue';

export default {
    props: ['entity'],
    components: {
        Instance
    },
    data() {
        return {
            showEntity: true,
            entityVisible: false
        };
    },
    methods: {
        toggleEntity() {
            this.entityVisible = !this.entityVisible;
        }
    }
};
</script>

<style scoped>
li {
    list-style: none;
    font-size: 1.2rem;
    cursor: pointer;
}

.entity-item {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
}

.instance-list {
    padding: 1.5rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
}

.toggle-icon {
    float: right;
    margin-right: 1rem;
}

ul {
    list-style: number;
}

ul:hover {
    cursor: pointer;
}
</style>

