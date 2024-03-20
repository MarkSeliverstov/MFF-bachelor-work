# Diary(logs) of the Bachelor Project

## 3.11.2023

New Use Case for NKOD: https://data.gov.cz/datové-sady

Feature to enhance your experience with NKOD or with smthing like that.

**For Analysts:** You can now easily create models and APIs by utilizing 
our *first* extension. This tool is designed to assist you in writing efficient
code, simplifying your work and increasing productivity.

**For Users:** Instead of navigating through web interfaces and conducting
extensive searches for APIs/models, you can now use our *secondary* extension.
This extension provides valuable suggestions directly in your code, making the
process of creating public models and APIs a breeze.

Furthermore, our extension is highly configurable, allowing users to tailor it
to their specific needs and preferences, thus enhancing the overall user
experience.

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
- [ ] Extracting the annotations from the code by python script
- [ ] Using filepath to model instead of server url in webapp
- [ ] Command for reloading the model from server instead of auto reload by save
    - [ ] User setting switch for auto reload

NOTE: Writing about usecases and (?) tutorials - for example, how to extend the
tool.

## 26.03.2024 (14:00)

