# Linking Software Artifacts (LSA)

The increasing size and complexity of software systems creates the need for
easy navigation and detection of **related parts**. Finding the use of a
component or a function declaration is now a commonly available functionality.
However, this functionality can be extended by linking at the data semantic
level. The new linking would allow linking **data models, specifications,
source code** in different languages, documentation, as well as other artifacts
of the software system. The basic idea is to **use annotations placed in
comments to indicate significant parts of the artifacts**. Annotations can, for
example, describe selected data entities and their properties. This information
could then be used, for example, for **code analysis, domain model construction,
or assisting programmers**.

## Software parts

- [![Version](https://img.shields.io/pypi/v/lsa-cli?logo=pypi&label=version)](https://pypi.org/project/lsa-cli)
  [lsa-cli](https://github.com/MarkSeliverstov/lsa-cli/tree/main) - Python CLI for parsing and converting the code to entities model.
- [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/lsa.lsa-helper?logo=vscodium)](https://marketplace.visualstudio.com/items?itemName=lsa.lsa-helper)
  [lsa-helper](./lsa-helper) - VSCode extension for annotating code.
- [![webpage](https://img.shields.io/badge/markseliverstov.github.io%2FMFF-bachelor-work?label=GH%20pages)](https://markseliverstov.github.io/MFF-bachelor-work/)
  [lsa-vizualizer](./lsa-visualizer) - Web application for visualizing the
  entities model.

### How you can use it

1. Write your code and annotate it using the `lsa-helper` extension.

    <details>
    <summary>Example</summary>

    ```typescript
    // @lc-entity
    // @lc-identifier :Annotation
    // @lc-name Annotation
    // @lc-description Base class for all annotations.
    export interface IAnnotation {
      // @lc-property
      // @lc-name name
      name: string
      // @lc-property
      // @lc-name value
      value: string | null
      // @lc-property
      // @lc-name annotationStartPos
      startPos: number
      // @lc-property
      // @lc-name annotationEndPos
      endPos: number
      // @lc-property
      // @lc-name annotationLine
      lineNumber: number
    }
    ```

    By adding annotations to your code, you can define entities and their
    properties, which can be later used for visualization and analysis. The
    annotations are defined by the `@lc-` prefix, followed by the **annotation
    name**. The **annotation name** is followed by the **annotation value**.

    > **Note:** You can redefine the prefix and annotation markers in the
    > `lsa-config.json` file.

    </details>

2. Use the `lsa-cli` to parse and convert the code to the
   entities (generates JSON files with the entities (and annotations) model).

   <details>
   <summary>Example</summary>

   ```json
    {
      "entities": [
        {
          "name": "Annotation",
          "instances": [
            {
              "from_file": "source-file.ts",
              "identifier": ":Annotation",
              "description": "Base class for all annotations.",
              "properties": [
                {
                  "name": "name",
                  "description": null
                },
                {
                  "name": "value",
                  "description": null
                },
                {
                  "name": "annotationstartpos",
                  "description": null
                },
                {
                  "name": "annotationendpos",
                  "description": null
                },
                {
                  "name": "annotationline",
                  "description": null
                }
              ]
            }
          ]
        }
      ]
    }
    ```

3. Use the `lsa-vizualizer` to visualize the entities model.

## Configuration

The configuration (default `.lsa-config.json`) file is used to configure the
[lsa-cli](https://github.com/MarkSeliverstov/lsa-cli/tree/main)
and [lsa-helper](./lsa-helper) extension. You can redefine the prefix
and annotation markers, as well as the server URL and parser settings. If the
configuration file is not found, the default values are used:

```json
{
  "prefix": "@lc-",
  "markers": {
    "identifier": "identifier",
    "name": "name",
    "type": "type",
    "description": "description",
    "entity": "entity",
    "property": "property",
    "method": "method",
    "source": "source"
  },
  "server": {
    "url": "http://localhost:5000"
  },
  "parser": {
    "output": {
      "entities": "entities.json",
      "annotations": "annotations.json"
    },
    "exclude": [],
    "extend": {}
  }
}
```

- `<prefix><marker>` - Defines the annotations, where
  - `prefix` - Prefix for the annotations.
  - `markers` - Annotation markers (for example, `<prefix>entity`).
- `server` - Server URL for the extension. The server is used for hinting and
  completion.
- `parser` - Parser settings for the CLI.
  - `output` - Output files for the CLI.
  - `exclude` - Paths to exclude from parsing.

    ```json
    "exclude": ["node_modules", ".git", ".venv"]
    ```

  - `extend` - File extensions to extend the parser. Where the key is the
    extension and the value is the MIME type ( you can see the list of supported
    MIME types [here](https://github.com/jeanralphaviles/comment_parser)).

    ```json
    "extend": {
      "cjs": "application/javascript",
      "mjs": "application/javascript",
      "jsx": "application/javascript"
    }
    ```
