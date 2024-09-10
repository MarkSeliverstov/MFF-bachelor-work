# LSA Visualizer

[Deployed GitHub Pages](https://markseliverstov.github.io/MFF-bachelor-work/)

This website is a part of the LSA (Linking software artifacts) project. LSA
Visualizer is a tool that helps developers visualize Entities and Annotations
within their projects.

By using our [LSA-CLI](https://pypi.org/project/lsa-cli)
tool, you can generate JSON files, which can then be uploaded to the LSA
Visualizer for a clear, structured overview of the entities and annotations
from your project. Additionally, the tool offers filtering options, allowing
users to easily sort and view specific entities and annotations according to
their needs.

### How to use

- **Step 1**: Generate a JSON files (`entities.json` / `annotations.json`) by
  using the [LSA-CLI](https://pypi.org/project/lsa-cli) tool in your project.

- **Step 2**: Upload the generated JSON file to the **LSA Visualizer** by
  clicking the `Upload` button.

#### JSON schemes

- [Annotations JSON scheme](./src/schemes/annotations.schema.json)
- [Entities JSON scheme](./src/schemes/entities.schema.json)

## Development

<details>

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

</details>
