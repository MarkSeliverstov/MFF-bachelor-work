# bachelor work repository

## How to install extension

```bash
$ git clone git@github.com:MarkSeliverstov/MFF-YearProject.git    # clone the repository
$ cd MFF-BACHELOR-WORK/entity-inspector                           # go to the extension folder
$ npm install                                                     # install npm packages
$ npm run build                                                   # create vsix package in current folder
```

## Propojení softwarových artefaktů 
(EN. Linking software artifacts)

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
