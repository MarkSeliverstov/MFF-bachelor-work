<template>
  <h4 class="text-subtitle" style="margin: 0 10px 10px 0">Entities</h4>
  <p>
    This is a list of all entities from your project. You can filter the list by typing in the input
    field below.
  </p>

  <q-input ref="filterRef" filled v-model="filter" label="Filter">
    <template v-slot:append>
      <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
      <div v-if="entities.entities" style="font-size: 16px">
        Found {{ filteredCount() }} entities
      </div>
    </template>
  </q-input>

  <div v-for="entity in entities.entities" :key="entity.name">
    <q-card
      flat
      bordered
      class="q-ma-md"
      v-if="entity.name.toLowerCase().includes(filter.toLowerCase())"
    >
      <q-item>
        <q-item-section>
          <q-expansion-item
            :label="entity.name"
            :header-class="`text-h6`"
            dense
            switch-toggle-side
            style="font-size: 16px"
          >
            <q-item>
              <q-item-section>
                <q-list bordered class="rounded-borders" style="margin: 10px 0" separator>
                  <q-item v-for="instance in entity.instances" :key="instance.identifier">
                    <q-item-section>
                      <div class="q-pa-md example-row-all-breakpoints">
                        <div class="row" style="font-style: italic">
                          <div class="col" style="font-weight: bold">{{ instance.identifier }}</div>
                          {{ instance.from_file }}
                        </div>

                        <div class="row" v-if="instance.description">
                          <div class="col">( {{ instance.description }} )</div>
                        </div>

                        <div class="row" style="margin-top: 10px">
                          <div class="col">
                            <q-card flat bordered>
                              <q-expansion-item
                                :label="`Properties ( ${instance.properties.length} )`"
                                dense
                                switch-toggle-side
                                style="font-size: 16px"
                                :content-inset-level="1"
                              >
                                <q-separator />
                                <div v-for="property in instance.properties" :key="property.name">
                                  <q-item-section>
                                    {{ property.name }}
                                    <span v-if="property.description">
                                      ( {{ property.description }} )
                                    </span>
                                  </q-item-section>
                                </div>
                              </q-expansion-item>
                            </q-card>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
            </q-item>
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
export default {
  setup() {
    const $q = useQuasar()
    const filter = ref('')
    const filterRef = ref(null)

    return {
      filter,
      filterRef,
      resetFilter() {
        filter.value = ''
        filterRef.value.focus()
      }
    }
  },

  data() {
    return {
      loading: true,
      entities: [],
      id: null
    }
  },
  beforeMount() {
    this.entities = this.fetchData()
    this.loading = false
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search)
    this.id = urlParams.get('id')
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
        const url = import.meta.env.VITE_ENTITIES_URL
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.entities = await response.json()
        return this.entities
      } catch (error) {
        this.notify('Failed to fetch data')
      }
    },
    filteredCount() {
      return this.entities.entities.filter((entity) =>
        entity.name.toLowerCase().includes(this.filter.toLowerCase())
      ).length
    }
  }
}
</script>
