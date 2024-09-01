<template>
  <div class="q-pa-md">
    <h4 class="text-subtitle" style="margin: 0 10px 10px 0">Annotations</h4>
    <p class="text-body1">
      This is a list of all annotations from your project files, displayed line by line. You can
      filter the list by typing in the input field below.
    </p>
  </div>

  <div v-if="!entities.filesAnnotations" class="q-ma-md">
    <p class="text-body1">
      You can upload a JSON file containing entities. The file should have the following format (<a
        href="/annotations/schema"
        >JSON schema</a
      >):
    </p>
    <pre>
      {
        "filesAnnotations": [
          {
            "relativeFilePath": "File path",
            "annotations": [
              {
                "lineNumber": 1,
                "annotation": "Annotation text"
                "value": "Annotation value"
              }
            ]
          }
        ]
    </pre>
    <q-file @update:model-value="updateFile" clearable filled label="Upload" class="q-ma-md" />
  </div>
  <div v-else-if="entities.filesAnnotations.length === 0" class="q-ma-md">
    <p>No entities found</p>
  </div>
  <div v-else>
    <q-btn color="primary" label="Clear entities" class="q-ml-md" @click="clearEntities" />

    <q-input ref="filterRef" filled v-model="filter" label="Filter by value" class="q-ma-md">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
        <div v-if="entities.filesAnnotations" style="font-size: 16px">
          Found {{ filteredCount() }} annotations
        </div>
      </template>
    </q-input>

    <div v-for="annotation in entities.filesAnnotations" :key="annotation.identifier">
      <q-card
        flat
        bordered
        class="q-ma-md"
        v-if="filtredAnnotations(annotation.annotations).length > 0"
      >
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
  </div>
</template>

<script src="./AnnotationsList.js"></script>
<style lang="sass" src="./AnnotationsList.sass"></style>
