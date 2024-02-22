<template>
    <div class="q-pa-md">
        <h4 
            class="text-subtitle"
            style="margin: 0 10px 10px 0;"
        >
            Annotations
        </h4>
        <p>
            This is a list of all annotations from your project files line by line.
            You can filter the list by typing in the input field below.
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
        };
    },
    beforeMount() {
        this.convertToTree();
    },
    methods: {
        async fetchData() {
            try {
                const url = "http://localhost:5000/annotations"; 
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
            this.NodeTree = [];
            for (const i in entities.filesAnnotations) {
                const fileAnnotation = entities.filesAnnotations[i]; 
                const fileAnnotationNode = {
                    label: fileAnnotation.relativeFilePath,
                    children: [],
                };
                
                for (const j in fileAnnotation.annotations) {
                    const annotation = fileAnnotation.annotations[j];
                    fileAnnotationNode.children.push(
                        { label: `( line: ${annotation.lineNumber} ) ${annotation.name} : ${annotation.value} ` }
                    )
                }

                this.NodeTree.push(fileAnnotationNode);
            }
            this.loading = false;
        }
    }
};
</script>
