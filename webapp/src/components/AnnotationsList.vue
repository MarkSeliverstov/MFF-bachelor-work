<template>
  <h4 class="text-subtitle" style="margin: 0 10px 10px 0">Annotations</h4>
  <p>
    This is a list of all annotations from your project files, displayed line by line. You can
    filter the list by typing in the input field below.
  </p>

  <q-input ref="filterRef" filled v-model="filter" label="Filter">
    <template v-slot:append>
      <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
      <div v-if="entities.filesAnnotations" style="font-size: 16px">
        Found {{ filteredCount() }} annotations
      </div>
    </template>
  </q-input>

  <div v-for="annotation in entities.filesAnnotations" :key="annotation.identifier">
    <q-card flat bordered class="q-ma-md">
      <q-item>
        <q-item-section>
          <q-expansion-item
            :label="annotation.relativeFilePath"
            :header-class="`text-h6`"
            dense
            switch-toggle-side
            style="font-size: 16px"
          >
            <div>
              <q-table
                class="my-sticky-virtscroll-table"
                dense
                virtual-scroll
                flat
                :rows-per-page-options="[0]"
                :virtual-scroll-sticky-size-start="48"
                row-key="lineNumber"
                :rows="filtredAnnotations(annotation.annotations)"
                :columns="columns"
              />
            </div>
          </q-expansion-item>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
  <q-spinner
    color="primary"
    size="3em"
    style="position: absolute; height: 30vh; left: 50%"
    v-if="loading"
  />
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const columns = [
  {
    name: 'line',
    align: 'center',
    label: 'Line',
    field: 'lineNumber',
    sortable: true,
    style: 'width: 30px'
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true
  },
  {
    name: 'value',
    align: 'left',
    label: 'Value',
    field: 'value',
    sortable: true,
    format: (val) => val || 'N/A'
  }
]
export default {
  setup() {
    const $q = useQuasar()
    const filter = ref('')
    const filterRef = ref(null)

    return {
      filter,
      filterRef,
      columns,
      resetFilter() {
        filter.value = ''
        filterRef.value.focus()
      }
    }
  },

  data() {
    return {
      loading: true,
      entities: {}
    }
  },
  async beforeMount() {
    this.entities = await this.fetchData()
    this.loading = false
  },
  methods: {
    notify(message) {
      this.$q.notify({
        color: 'red',
        message: message,
        position: 'top-right',
        icon: 'error',
        timeout: 1000
      })
    },
    async fetchData() {
      try {
        const url = import.meta.env.VITE_ANNOTATIONS_URL
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`File not found at ${url}`)
        }
        this.entities = await response.json()
        return this.entities
      } catch (error) {
        this.notify(`Failed to fetch data: ${error}`)
      }
    },
    filtredAnnotations(annotations) {
      return annotations.filter((annotation) => {
        if (annotation.value === null) {
          return false
        }
        return annotation.value.toLowerCase().includes(this.filter.toLowerCase())
      })
    },
    filteredCount() {
      return this.entities.filesAnnotations.reduce((acc, file) => {
        return acc + this.filtredAnnotations(file.annotations).length
      }, 0)
    }
  }
}
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  max-height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $dark

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
