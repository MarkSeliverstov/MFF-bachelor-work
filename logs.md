# Diary(logs) of the Bachelor Project

## 3.11.2023

New Use Case for NKOD: <https://data.gov.cz/datové-sady>

Feature to enhance your experience with NKOD or with smthing like that.

**For Analysts:** You can now easily create models and APIs by utilizing
our *first* extension. This tool is designed to assist you in writing efficient
code, simplifying your work and increasing productivity.

**For Users:** Instead of navigating through web interfaces and conducting
extensive searches for APIs/models, you can now use our *secondary* extension.
This extension provides valuable suggestions directly in your code, making the
process of creating public models and APIs a breeze.

Furthermore, our extension is highly configurable, allowing users to tailor it
to their specific needs and preferences, thus enhancing the overall user experience.

## Need to do

- [x] Syntax extension suggestions (When typing "@ei-")
- [x] source suggestion (When typing "@ei-source ")
- [x] Code snipets. (When typing "@ei-entity")

## 23.11.2023

- [x] Implement HTTP server for created ei-model

## 8.12.2023

- [x] Flask
- [x] Post annotations on-save to the server
- [x] Intellisece for all model entities (Request and generate)
- [x] Authorizace with token
- [ ] Annotations Converter on the server (FAKE now)

## 26.1.2024

- [ ] Extension: suggestions from the server. ISSUE: Vscode API does not support
  asynchronous functions for suggestions.
- [x] Showing entities as diagram

## 05.02.2024

Issues:

- It make sense LSP instead of VScode extension? Could be used in any
editors with LSP support.
- Problem with coplitions - complitions are synchronized, that is, they cannot
  be used correctly with asynchronous functions (fetch)

## 7.02.2024

- [x] Write about async complitions
- [x] Commit and PUSH

## 9.02.2024

- [x] Next meeting date
- [x] Etities and Anotations view
- [x] Try to generate random id in the entity id when creating the entity

## 13.02.2024

- [x] Connecting Vue app with vizualiazation to the server
- [x] Annotations instead of Entities (for now)
- [x] Nav bar

## 20.02.2024 (14:00)

- [x] Annotations - entities converter
- [x] Searching by files, entities, annotation values
- [x] Group by files and by separators (`Entity`, `property`)
- [x] View for identifiers (with query parameter `?id=...`)
- [x] Click in VSCode to go to entities definition by identifier

NOTE: Possible feature: using handlebars (js library) to auto generate code by
user template (generates class by entity model)

## 27.02.2024 (14:00)

- [ ] CI/CD as a script for generating documentation (actually
  "annotations/entity file") as GitHub pages
- [x] Extracting the annotations from the code by python script
- [x] Using filepath to model instead of server url in webapp
- [ ] Command for reloading the model from server instead of auto reload by save
  - [ ] User setting switch for auto reload

NOTE: Writing about usecases and (?) tutorials - for example, how to extend the
tool.

#### Definition of done

**VSCode extension:** Extension hints, suggestions the annotations and
creates the annotations model from the code base. Also allows to generate the
code based on the annotations model.

**Python script:** Extracts the annotations from the code base and creates the
annotations model. Can be used as a CI/CD script.

**Webapp:** Visualizes the annotations model and allows to navigate through the
annotations.

**Documentation:** The documentation is generated from the annotations model and
is available as a GitHub page.

#### Use cases

Examples of use cases:

We have a data pipeline writed in different languages. We want to make sure that
the entities are consistent across the code base. We can use the tool to create
the model of the code base and analyze it. In case of different entities, you
can see locations of the entities and fix it.

- For Analysts: You can now easily create models of the code base and analyze it.
- For Developers: Suggestions and hints entities existed in the model.

## 22.03.2024 (14:00)

- [?] Add some abstract entities defined by user - how we want to convert and
  use it? (additional prfixes in config file? - [`@lc-issue`] for example)
- [1/2] Using config file instead of vscode settings - using the same config
  file for the server and the extension (currently only for the server, for
  extension it is more difficult) - `ei-config.json`
- [x] Cnnect extractor and server - it is backend no where is server and cli app

- [x] 27.03 Write updates

Additional: Wrote readme's for the backend, cleaned up the code.

## Writing

- [ ] Analyze - what is the problem? Use cases and examples. Who is the user?
  What is the goal? What is the solution? OR Design

## 19.07.2024

- Hints - refactoring
- Inline hints - fix formatting
- Inline hints - snippets customization
- Markers customization in config

Webapp:

- Upload annotations and entities files in home view (if urls are not set in
  the env)
- Add checkboxes for annotation names in the search view
- When there is no filtered data - show label "No data found"

Documentation:

- Fix about page in webapp (write it really like about page)
- Change logo and page title in webapp
- Add documentation abot file structure using [json-schema](https://json-schema.org/learn/getting-started-step-by-step) + add version

Backend:

- CLI strict uargument using and help message
- CLI - more logs
- CLI - info about stepsa after parse (that you can upload the model to the server)
- `python cli.py parse ./entity-inspector` = `python cli.py parse ~/git/mff/MFF-bachelor-work/entity-inspector`

Documentation:

- title
- `Instalation` part instead of `Getting`
- README per each component and link to in the main README
- Tutorialek
- Separate landing page about the project

Text:

- Update ralated work

### What is DONE

- Upload annotations and entities files (if urls are not set in the env - do we
  really need local/server files now?)
- Json schema for the entities, annotations and validation based on it.
- Divided vue templates to logical js parts
- Added logo and title to the webapp
- Viewing schemes in the webapp
- Fixed about page in the webapp
- Renaming EI(Entity Inspector) to LSA(Linking Software Artifacts) - is it fine?
- Making new repository for the project and divide it? Need to create repo for
  python library. - [new repo](https://github.com/MarkSeliverstov/lsa-cli)
- Added more logs to the CLI
- Support custom markers names in the config and cli parser
- Simplify the CLI usage
- Added README for all parts of application
- Rename to LSA (Linking Software Artifacts) project
- Renamed extension to LSA-Helper and published it
- Updated Documentation for each part of the project
- Fixed hinst alignment in the extension
