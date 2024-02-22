from typing import List, Optional
from copy import deepcopy

class Property:
    def __init__(self, name: Optional[str] = None, description: Optional[str] = None):
        self.name = name
        self.description = description

class EntityInstance:
    def __init__(self, from_file: Optional[str] = None, identifier: Optional[str] = None, description: Optional[str] = None, properties: Optional[List[Property]] = None):
        self.from_file = from_file
        self.identifier = identifier
        self.description = description
        self.properties: List[Property] = deepcopy(properties) if properties else []

class Entity:
    def __init__(self, name: Optional[str] = None, instances: Optional[List[EntityInstance]] = None):
        self.name = name
        self.instances: List[EntityInstance] = deepcopy(instances) if instances else []

class AnnotationsToEntitiesConverter:
    def __init__(self):
        self.entities: List[Entity] = []

    def _add_instance(self, name: Optional[str], instance: EntityInstance):
        entity = next((entity for entity in self.entities if entity.name == name), None)
        if entity:
            entity.instances.append(instance)
        else:
            self.entities.append(Entity(name=name, instances=[instance]))

    def _convert_annotations_to_entities(self, annotations: dict) -> None:
        current_instance: Optional[EntityInstance] = None
        current_property: Optional[Property] = None
        current_entity_name: Optional[str] = None
        for file_annotation in annotations.get("filesAnnotations", []):
            current_file_path = file_annotation.get("relativeFilePath", None)

            for annotation in file_annotation.get("annotations", []):
                annotation_name = annotation.get("name", None)
                annotation_value = annotation.get("value", None)

                if annotation_name == "entity":
                    if current_instance:
                        self._add_instance(current_entity_name, current_instance)
                    current_entity_name = None
                    current_property = None

                elif annotation_name == "property":
                    if current_instance and current_property:
                        current_instance.properties.append(Property(current_property.name, current_property.description))
                    current_property = Property(None, None)

                elif annotation_name == "identifier":
                    current_instance = EntityInstance(current_file_path, annotation_value, None)

                elif annotation_name == "name":
                    if current_instance:
                        if current_property:
                            current_property.name = annotation_value
                        else:
                            current_entity_name = annotation_value

                elif annotation_name == "description":
                    if current_instance:
                        if current_property:
                            current_property.description = annotation_value
                        else:
                            current_instance.description = annotation_value

        if current_instance:
            self._add_instance(current_entity_name, current_instance)

    def convert(self, annotations: dict) -> dict:
        self._convert_annotations_to_entities(annotations)
        json_entities = {
            "entities": [
                {
                    "name": entity.name,
                    "instances": [
                        {
                            "from_file": instance.from_file,
                            "identifier": instance.identifier,
                            "description": instance.description,
                            "properties": [
                                {
                                    "name": property.name,
                                    "description": property.description
                                }
                                for property in instance.properties
                            ]
                        }
                        for instance in entity.instances
                    ]
                }
                for entity in self.entities
            ]
        }
        self.entities = []
        return json_entities

