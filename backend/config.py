import os
import json
import structlog

from enum import Enum

logger = structlog.get_logger()


class Config:
    """
    Config class to store the configuration of the tool
    """

    class Annotation(Enum):
        """
        Enum class to store the annotation types
        """

        IDENTIFIER = "identifier"
        NAME = "name"
        TYPE = "type"
        DESCRIPTION = "description"
        ENTITY = "entity"
        PROPERTY = "property"
        METHOD = "method"
        SOURCE = "source"

    ANNOTATION_PREFIX: str = "@lc-"
    ANNOTATION_MARKERS: dict[Annotation, str] = {
        Annotation.IDENTIFIER: "identifier",
        Annotation.NAME: "name",
        Annotation.TYPE: "type",
        Annotation.DESCRIPTION: "description",
        Annotation.ENTITY: "entity",
        Annotation.PROPERTY: "property",
        Annotation.METHOD: "method",
        Annotation.SOURCE: "source",
    }
    OUTPUT_ENTITIES: str = "entities.json"
    OUTPUT_ANNOTATIONS: str = "annotations.json"
    EXTENSIONS_MAP: dict[str, str] = {
        "ts": "application/javascript",
        "js": "application/javascript",
        "py": "text/x-python",
        "html": "text/html",
        "java": "text/x-java-source",
        "c": "text/x-c",
        "h": "text/x-c",
        "cpp": "text/x-c++",
        "hpp": "text/x-c++",
        "xml": "text/xml",
    }
    PARSER_EXCLUDE: list[str] = []

    @staticmethod
    def from_file(config_file_path: str) -> "Config":
        """
        Load the configuration from a file
        """
        if not os.path.exists(config_file_path):
            logger.warning(
                f"Config file not found: {config_file_path}. ",
                "Using default configuration.",
            )
            return Config()

        with open(config_file_path) as f:
            config_f = json.load(f)
            config = Config()
            config.ANNOTATION_PREFIX = config_f.get("prefix", config.ANNOTATION_PREFIX)

            output = config_f.get("output")
            if output:
                config.OUTPUT_ENTITIES = output.get("entities", config.OUTPUT_ENTITIES)
                config.OUTPUT_ANNOTATIONS = output.get(
                    "annotations", config.OUTPUT_ANNOTATIONS
                )

            parser = config_f.get("parser")
            if parser:
                config.PARSER_EXCLUDE = parser.get("exclude", config.PARSER_EXCLUDE)
                config.EXTENSIONS_MAP.update(parser.get("extend", {}))

            return config
