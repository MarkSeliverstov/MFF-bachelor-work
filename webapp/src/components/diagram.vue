<template>
  <div id="network"></div>
</template>

<script>
import { Network } from 'vis-network';

export default {
  name: 'VisDiagram',
  props: ['data'],
  mounted() {
    this.createNetwork();
  },
  methods: {
    createNetwork() {
      const container = document.getElementById('network');
      const data = this.data; // Assuming this is your dummy JSON data passed as a prop
      const options = {};
      new Network(container, data, options);
    }
  }
}
</script>

<style>
#network {
  width: 600px; /* Adjust as necessary */
  height: 400px; /* Adjust as necessary */
}
</style>
