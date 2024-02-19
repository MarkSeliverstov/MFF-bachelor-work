<template>
    <div class="entity-item">
        <li v-if="showEntity" @click="toggleEntity" style="font-size: 1.5rem;">
            <div>
                <span>{{ annotation.relativeFilePath }}</span>
                <span v-if="entityVisible" class="toggle-icon">-</span>
                <span v-else class="toggle-icon">></span>
            </div>
        </li>
        <div v-if="entityVisible" class="instance-list">
            <ul>
                <li v-for="(item, index) in annotation.annotations" :key="index">
                    <span style="font-weight: bold;">{{ item.name }}</span>
                    <span v-if="item.value">: {{ item.value }}</span>
                    <span> (line number: {{ item.lineNumber }})</span>
                </li>
            </ul>
            </div>
    </div>
</template>

<script>

export default {
    props: ['annotation'],
    data() {
        console.log(this.annotation);
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
    justify-content: center;
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

