<template>
    <div class="q-pa-md">
        <h4 class="text-subtitle" style="margin: 0 10px 10px 0;">
            Entities
        </h4>
        <p>
          This is a list of all entities from your project. You can filter the
          list by typing in the input field below.
        </p>
        <q-input ref="filterRef" filled v-model="filter" label="Filter">
            <template v-slot:append>
                <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
            </template>
        </q-input>

        <q-tree :nodes="NodeTree" node-key="label" dense :filter="filter" class="text-h6 q-pa-md " />
    </div>
    <q-spinner color="primary" size="3em" style="position: absolute; height:30vh; left: 50%;" v-if="loading"/>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const filter = ref('');
        const filterRef = ref(null);
        const NodeTree = ref([]);

        return {
            filter,
            filterRef,
            NodeTree,
            resetFilter() {
                filter.value = ''
                filterRef.value.focus()
            }
        };
    },

    data() {
        return {
            loading: true,
            entities: {},
            tree: [],
            id: null,
        };
    },
    beforeMount() {
        this.convertToTree();
    },
    created() {
        let urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');

    },
    methods: {
        async fetchData() {
            try {
                const url = import.meta.env.VITE_ENTITIES_URL;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.entities = await response.json();
                return this.entities;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        async convertToTree() {
            const entities = await this.fetchData();
            const tree = [];
            for (const i in entities.entities) {
                const entity = entities.entities[i];
                const entityNode = {
                    label: entity.name,
                    children: [],
                };
                for (const j in entity.instances) {
                    const instance = entity.instances[j];
                    entityNode.children.push(
                        { label: "id: " + instance.identifier, },
                        { label: "description: " + instance.description, },
                        { label: "from file: " + instance.from_file, },
                    );
                    for (const k in instance.properties) {
                        const property = instance.properties[k];
                        entityNode.children.push({
                            label: "properties",
                            children: [
                                { label: `${property.name}`, children: [
                                    { label: `description: ${property.description}`}]}
                            ],
                        });
                    }
                    
                    // filter by id if id is present in the url
                    if (this.id) {
                        if (instance.identifier === this.id) {
                            tree.push(entityNode);
                        }
                    } else {
                        tree.push(entityNode);
                    }
                }
                this.NodeTree = tree;
                this.loading = false;
            }
        }
    }
};
</script>
