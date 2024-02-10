<template>
    <div>
        <li v-if="showEntity" @click="toggleEntity">
            <div>
                {{ entity.identifier }}
                <span v-if="entityVisible" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </div>
        </li>
        <ul v-if="showEntity && entityVisible">
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
