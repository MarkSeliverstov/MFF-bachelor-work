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


