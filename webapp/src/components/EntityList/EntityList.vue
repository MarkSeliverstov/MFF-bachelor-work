<template>
  <div class="q-pa-md">
    <h4 class="text-subtitle" style="margin: 0 10px 10px 0">Entities</h4>
    <p>
      This is a list of all entities from your project. You can filter the list by typing in the
      input field below.
    </p>
  </div>

  <div v-if="!entities.entities" class="q-ma-md">
    <p>
      You can upload a JSON file containing entities. The file should have the following format:
    </p>
    <pre>
      {
        "entities": [
          {
            "name": "Entity name",
            "instances": [
              {
                "identifier": "Instance identifier",
                "from_file": "File name",
                "description": "Instance description",
                "properties": [
                  {
                    "name": "Property name",
                    "description": "Property description"
                  }
                ]
              }
            ]
          }
        ]
      }
    </pre>
    <q-file @update:model-value="updateFile" clearable filled label="Pick files" class="q-ma-md" />
  </div>
  <div v-else-if="entities.entities.length === 0" class="q-ma-md">
    <p>No entities found</p>
  </div>
  <div v-else>
    <q-btn color="primary" label="Clear entities" class="q-ml-md" @click="clearEntities" />

    <q-input ref="filterRef" filled v-model="filter" label="Filter" class="q-ma-md">
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
                            <div class="col" style="font-weight: bold">
                              {{ instance.identifier }}
                            </div>
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
  </div>
</template>

<script src="./EntityList.js"></script>
