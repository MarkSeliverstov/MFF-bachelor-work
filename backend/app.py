#!/usr/bin/env python3

import json
import os
from argparse import Namespace, ArgumentParser

from .config import Config
from .src.annotations_to_entities_converter import AnnotationsToEntitiesConverter
from .src.annotation_parser import AnnotationParser, export_annotations_to_json


def _parse_command(path: str, config: Config, output: str) -> None:
    parser = AnnotationParser(
        config.PARSER_EXCLUDE, config.ANNOTATION_PREFIX, config.EXTENSIONS_MAP
    )
    model = parser.parse(path)
    export_annotations_to_json(model, output)


def _convert_command(annotations_file: str, output: str) -> None:
    converter = AnnotationsToEntitiesConverter()

    if not os.path.exists(annotations_file):
        print(f"File {annotations_file} does not exist")
        return
    with open(annotations_file) as f:
        annotations = json.load(f)

    entities = converter.convert(annotations)
    if not entities:
        print("No entities found in annotations")
        return
    with open(output, "w") as f:
        json.dump(entities, f, indent=4)


def run():
    default_config = Config()

    # Commands for parse annotations, convert annotations to entities and save entities as enum
    parser = ArgumentParser(
        description="Parse annotations from source code and convert them to entities"
    )
    parser.add_argument(
        "-c",
        "--config",
        help="Path to the configuration file",
        type=str,
    )
    subparsers = parser.add_subparsers(dest="command", help="commands")
    parse_parser = subparsers.add_parser(
        "parse", help="Parse annotations from source code"
    )
    convert_parser = subparsers.add_parser(
        "convert", help="Convert annotations to entities"
    )

    # Arguments for parse command
    parse_parser.add_argument(
        "path", help="Path to file or directory to parse", type=str, default="."
    )
    parse_parser.add_argument(
        "-o",
        "--output",
        help="Output file name",
        type=str,
        default=default_config.OUTPUT_ANNOTATIONS,
    )

    # Arguments for convert command
    convert_parser.add_argument(
        "-a",
        "--annotations",
        type=str,
        help="Path to the annotations file",
        default=default_config.OUTPUT_ANNOTATIONS,
    )
    convert_parser.add_argument(
        "-o",
        "--output",
        type=str,
        help="Path to the output file",
        default=default_config.OUTPUT_ENTITIES,
    )

    args: Namespace = parser.parse_args()
    config: Config = Config.from_file(args.config) if args.config else default_config
    if args.command == "parse":
        _parse_command(args.path, config, args.output)
    elif args.command == "convert":
        _convert_command(args.annotations, args.output)
    else:
        _parse_command(".", config, config.OUTPUT_ANNOTATIONS)
        _convert_command(config.OUTPUT_ANNOTATIONS, config.OUTPUT_ENTITIES)


if __name__ == "__main__":
    run()
