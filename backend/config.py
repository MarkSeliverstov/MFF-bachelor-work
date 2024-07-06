import json
import os

EXTENSIONS_MAP = {
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


class Config:
    """
    Config class to store the configuration of the tool
    """

    ANNOTATION_PREFIX = "@lc-"
    OUTPUT_ANNOTATIONS = "annotations.json"
    OUTPUT_ENTITIES = "entities.json"
    PARSER_EXCLUDE = []
    PARSER_INCLUDE = []

    @staticmethod
    def from_file(config_file) -> "Config":
        """
        Load the configuration from a file
        """
        if not os.path.exists(config_file):
            return Config()
        with open(config_file) as f:
            config_f = json.load(f)
            config = Config()
            config.ANNOTATION_PREFIX = config_f.get(
                "prefixName", config.ANNOTATION_PREFIX
            )
            config.OUTPUT_ANNOTATIONS = config_f.get(
                "annotationsModel", config.OUTPUT_ANNOTATIONS
            )
            config.OUTPUT_ENTITIES = config_f.get(
                "entitiesModel", config.OUTPUT_ENTITIES
            )
            config.PARSER_EXCLUDE = config_f.get("parserExclude", config.PARSER_EXCLUDE)
            config.PARSER_INCLUDE = config_f.get("parserInclude", config.PARSER_INCLUDE)
            return config
