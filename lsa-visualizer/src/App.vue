<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto; position: relative">
    <div class="q-pa-md">
      <q-tabs dense class="bg-indigo text-white rounded-borders">
        <q-route-tab to="/" name="about" label="About" />
        <q-space />
        <q-route-tab to="/entities" name="entities" label="Entities" />
        <q-route-tab to="/annotations" name="annotations" label="Annotations" />
      </q-tabs>
    </div>

    <RouterView />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('')
    }
  }
}
</script>

<style>
h1 {
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
}

a {
  color: #1976d2;
  text-decoration: none;
}

code {
  background-color: #404040;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
