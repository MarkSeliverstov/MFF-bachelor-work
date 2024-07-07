#!/usr/bin/env python3

import os
import json
from comment_parser import comment_parser
from argparse import ArgumentParser, Namespace

from ..models.annotation_model import Annotation, SourceFileAnnotations
from ..config import Config


class AnnotationParser:
    def __init__(
        self,
        parser_exclude: list[str],
        annotation_prefix: str,
        extensions_map: dict[str, str],
    ) -> None:
        self.parser_exclude: list[str] = parser_exclude
        self.annotation_prefix: str = annotation_prefix
        self.extensions_map: dict[str, str] = extensions_map

    def parse(self, path: str) -> list[SourceFileAnnotations]:
        if os.path.isfile(path):
            if any(ex in path for ex in self.parser_exclude):
                return []
            return []

        elif os.path.isdir(path):
            model: list[SourceFileAnnotations] = []
            for root, dirs, files in os.walk(path):
                if any(ex in root for ex in self.parser_exclude):
                    continue
                for file in files:
                    model.append(self._parse_file(os.path.join(root, file)))
                for dir in dirs:
                    model.extend(self.parse(os.path.join(root, dir)))
            return model
        else:
            raise ValueError(f"Invalid path: {path}")

    def _parse_file(self, path: str) -> SourceFileAnnotations:
        annotations: list[Annotation] = []
        for comment in self._parse_comments(path):
            annotation: Annotation | None = self._convert_comment_to_annotation(comment)
            if annotation:
                annotations.append(annotation)
        return SourceFileAnnotations(path, annotations)

    def _parse_comments(self, path: str) -> list[str]:
        file_extension: str = os.path.splitext(path)[1].lstrip(".")
        mime: str | None = self.extensions_map.get(file_extension, None)
        return comment_parser.extract_comments(path, mime)

    def _convert_comment_to_annotation(self, comment) -> Annotation | None:
        tokens: list[str] = comment.text().strip().split(" ")
        if len(tokens) < 1 or len(tokens) > 2:
            return None

        annotation_name: str = tokens[0].strip()
        if not annotation_name.startswith(self.annotation_prefix):
            return None

        annotation_name = annotation_name[len(self.annotation_prefix) :]
        if len(tokens) == 1:
            return Annotation(annotation_name, None, comment.line_number())
        return Annotation(annotation_name, tokens[1].strip(), comment.line_number())


def export_annotations_to_json(model: list[SourceFileAnnotations], file: str) -> None:
    with open(file, "w") as f:
        json_model: dict = {
            "filesAnnotations": [
                {
                    "relativeFilePath": source_file.relative_file_path,
                    "annotations": [
                        annotation.__dict__ for annotation in source_file.annotations
                    ],
                }
                for source_file in model
            ]
        }
        json.dump(json_model, f, indent=4)


if __name__ == "__main__":
    config: Config = Config.from_file("ei-config.json")
    parser: ArgumentParser = ArgumentParser(
        description="Parse annotations from source code"
    )
    parser.add_argument("path", help="Path to file or directory to parse", type=str)
    parser.add_argument(
        "-o",
        "--output",
        help="Path to model file",
        type=str,
        default=config.OUTPUT_ANNOTATIONS,
    )

    args: Namespace = parser.parse_args()
    annotation_parser: AnnotationParser = AnnotationParser(
        config.PARSER_EXCLUDE, config.ANNOTATION_PREFIX, config.EXTENSIONS_MAP
    )
    model: list[SourceFileAnnotations] = annotation_parser.parse(args.path)
    export_annotations_to_json(model, args.output)
