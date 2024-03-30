#!/usr/bin/env python3

import argparse
from config import *
from src.annotations_to_entities_converter import *
from src.annotation_parser import *

def _parse_command(path: str, annotation_prefix: str, output: str) -> None:
    model = extract_annotations(path, annotation_prefix)
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
    config = Config.from_file("ei-config.json")
    # Commands for parse annotations, convert annotations to entities and save entities as enum
    parser = argparse.ArgumentParser(description="Parse annotations from source code and convert them to entities")
    subparsers = parser.add_subparsers(dest="command", help="commands")
    parse_parser = subparsers.add_parser("parse", help="Parse annotations from source code")
    convert_parser = subparsers.add_parser("convert", help="Convert annotations to entities")

    # Arguments for parse command
    parse_parser.add_argument("path", help="Path to file or directory to parse", type=str, default=".")
    parse_parser.add_argument("-p", "--annotation-prefix", help="Annotation prefix", type=str, default=config.ANNOTATION_PREFIX)
    parse_parser.add_argument("-o", "--output", help="Output file name", type=str, default=config.OUTPUT_ANNOTATIONS)

    # Arguments for convert command
    convert_parser.add_argument("-a", "--annotations", type=str, help="Path to the annotations file", default=config.OUTPUT_ANNOTATIONS)
    convert_parser.add_argument("-o", "--output", type=str, help="Path to the output file", default=config.OUTPUT_ENTITIES)

    args = parser.parse_args()
    if args.command == "parse":
        _parse_command(args.path, args.annotation_prefix, args.output)
    elif args.command == "convert":
        _convert_command(args.annotations, args.output)
    else:
        _parse_command(".", config.ANNOTATION_PREFIX, config.OUTPUT_ANNOTATIONS)


if __name__ == "__main__":
    run()
