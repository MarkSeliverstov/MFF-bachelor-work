<template>
  <h1>LSA Visualizer</h1>

  <p class="text-body1 q-pa-md">
    This website is a part of the <strong>LSA (Linking software artifacts)</strong> project (<a
      href="https://github.com/MarkSeliverstov/MFF-bachelor-work"
      >GitHub</a
    >). <strong>LSA Visualizer</strong> is a tool that helps developers visualize
    <strong>Entities</strong> and <strong>Annotations</strong> within their projects. By using our
    LSA-CLI tool, developers can generate JSON files, which can then be uploaded to the LSA
    Visualizer for a clear, structured overview of the entities and annotations. Additionally, the
    tool offers filtering options, allowing users to easily sort and view specific entities and
    annotations according to their needs.
  </p>

  <h5 class="q-px-md">Requirements</h5>

  <ul>
    <li class="text-body1">
      <a href="annotations/schema">Annotations JSON Schema</a>
    </li>
    <li class="text-body1">
      <a href="entities/schema">Entities JSON Schema</a>
    </li>
  </ul>

  <h5 class="q-px-md">How to Use</h5>
  <ul>
    <li class="text-body1">
      <strong>Step 1:</strong> Install the LSA-CLI tool by running the following command:
      <code>pip install lsa-cli</code>
    </li>
    <li class="text-body1">
      <strong>Step 2:</strong> Generate a JSON files (entities.json and annotations.json)
    </li>
    <li class="text-body1">
      <strong>Step 3:</strong> Upload the generated JSON file to the LSA Visualizer by clicking the
      "Upload" button.
    </li>
  </ul>
</template>
