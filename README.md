# Bachelor work repository

### Propojení softwarových artefaktů 

Rostoucí velikost a složitost softwarových systémů vytváří potřebu snadné navigace a detekce souvisejících částí.
Dohledání využití komponenty, či deklarace funkce, je dnes již běžně dostupnou funkcionalitou.
Tato funkcionalita však může být rozšířena o propojení na datově sémantické úrovni.
Nové propojení by umožnilo provázat datové modely, specifikace, zdrojové kódy v různých jazycích, dokumentace, ale i další artefakty softwarového systému.
Základní myšlenkou je využití anotací umístěných v komentářích, které budou označovat významné části artefaktů.
Anotace mohou například popisovat vybrané datové entity a jejich vlastnosti.
Tuto informaci by následně bylo možné využít například pro analýzu kódu, konstrukci doménového modelu, či asistenci programátorům.
Zcela zásadní pro adopci tohoto přístupu, je však podpora ze strany softwarových nástrojů.
V rámci práce student navrhne a implementuje proof-of-concept řešení, které budou demonstrovat využití výše popsaného přístupu.
Součástí řešení bude rozšíření pro Visual Studio Code, které usnadní vývojáři tvorbu anotací.
Uživatel bude dále s pomocí řešení schopen anotovat datové entity a následně vizualizovat jejich vztahy napříč softwarovým systémem.


<details close>
<summary>English version</summary>

> ### Linking software artifacts
> 
> The increasing size and complexity of software systems creates the need for easy navigation and detection of related parts.
> Finding the use of a component or a function declaration is now a commonly available functionality.
> However, this functionality can be extended by linking at the data semantic level.
> The new linking would allow linking data models, specifications, source code in different languages, documentation, as well as other artifacts > of the software system.
> The basic idea is to use annotations placed in comments to indicate significant parts of the artifacts.
> Annotations can, for example, describe selected data entities and their properties.
> This information could then be used, for example, for code analysis, domain model construction, or assisting programmers.
> However, support from software tools is essential for the adoption of this approach.
> As part of the thesis, the student will design and implement proof-of-concept solutions that demonstrate the use of the approach described > above.
> The solution will include an extension for Visual Studio Code to facilitate the developer's annotation.
> Furthermore, the user will be able to annotate data entities with the solution and then visualize their relationships across the software > system.

</details>


# Entity Inspector VScode extension

#### Extension installation

```bash
$ cd ./entity-inspector                     # go to the extension folder
$ npm install                               # install npm packages
$ npm run build                             # create vsix package in current folder
```

# Backend for the project (server and CLI)

#### Instalation

```bash
$ python3 -m venv .venv                     # create virtual env.
$ ./.venv/bin/activate                      # activaste virtual env.
$ python3 install -r requirements.txt       # install dependencies
```

#### Flask sever for Entity Extension

```bash
$ python3 run.py                            # runs on `http://127.0.0.1:5000`
```

#### CLI for Entity Extension

| Command | Description |
| --- | --- |
| `./cli.py --help` | Display help message |
| `./cli.py parse <path>` | Parse the given path and creates annotations model |
| `./cli.py convert <path>` | Convert the given path to the entities model |
| `./cli.py` | parses root and converts to entities model` |

# Configuration

- `ei-config.json` file is used to configure the CLI and extension:
    ```json
    {
        "prefixName": "@lc",
        "identifierMarker": "identifier",
        "nameMarker": "name",
        "typeMarker": "type",
        "descriptionMarker": "description",
        "entityMarker": "entity",
        "propertyMarker": "property",
        "methodMarker": "method",
        "sourceMarker": "source",
        "serverUrl": "http://localhost:5000",
        "annotationsModel": "annotations.json",
        "entitiesModel": "entities.json",
        "parserExclude": ["node_modules", ".git", ".venv"],
        "parserInclude": ["entity-inspector"]
    }
    ```

# Web application

Application for ei-models vizualzation. **All commands are executed in the `webapp` folder**

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

