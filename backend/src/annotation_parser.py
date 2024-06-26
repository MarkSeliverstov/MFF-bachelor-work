#!/usr/bin/env python3

import argparse
import os
import json
from comment_parser import comment_parser

from ..models.annotation_model import *
from ..config import *


def extract_annotations(path: str, annotation_prefix: str, exclude: List[str], include: List[str]) -> List[SourceFileAnnotations]:
    if os.path.isfile(path):
        if any(ex in path for ex in exclude):
            return []
        if any(path.startswith("./" + inc) for inc in include) or len(include) == 0:
            return [_parse_file(path, annotation_prefix)]
        return []

    elif os.path.isdir(path):
        model: List[SourceFileAnnotations] = []
        for root, dirs, files in os.walk(path):
            if any(ex in root for ex in exclude) or not any(root.startswith("./" + inc) for inc in include):
                continue
            for file in files:
                model.append(_parse_file(os.path.join(root, file), annotation_prefix))
            for dir in dirs:
                model.extend(extract_annotations(os.path.join(root, dir), annotation_prefix, exclude, include))
        return model
    else:
        raise ValueError(f"Path {path} is not a file or directory")


def _parse_file(path: str, annotation_prefix: str) -> SourceFileAnnotations:
    annotations: List[Annotation] = []
    for comment in _parse_comments(path):
        annotation = _convert_comment_to_annotations(comment, annotation_prefix)
        if annotation:
            annotations.append(annotation)
    return SourceFileAnnotations(path, annotations)
        

def _parse_comments(path: str, mime: Optional[str] = None) -> List[str]:
    file_extension = os.path.splitext(path)[1].lstrip(".")
    if mime is None:
        mime = EXTENSIONS_MAP.get(file_extension, None)
    if mime is None:
        return []
    return comment_parser.extract_comments(path, mime)


def _convert_comment_to_annotations(comment, prefix) -> Optional[Annotation]:
    tokens = comment.text().strip().split(" ")
    if len(tokens) < 1 or len(tokens) > 2:
        return None

    annotation_name = tokens[0].strip()
    if not annotation_name.startswith(prefix):
        return None

    annotation_name = annotation_name[len(prefix):]
    if (len(tokens) == 1):
        return Annotation(annotation_name, None, comment.line_number())
    return Annotation(annotation_name, tokens[1].strip(), comment.line_number())


def export_annotations_to_json(model: List[SourceFileAnnotations], file: str) -> None:
    with open(file, "w") as f:
        json_model = {
            "filesAnnotations": [
                {
                    "relativeFilePath": source_file.relative_file_path,
                    "annotations": [annotation.__dict__ for annotation in source_file.annotations]
                } for source_file in model
            ]
        }
        json.dump(json_model, f, indent=4)

    
if __name__ == "__main__":
    config = Config.from_file("ei-config.json")
    parser = argparse.ArgumentParser(description="Parse annotations from source code")
    parser.add_argument("path", help="Path to file or directory to parse", type=str)
    parser.add_argument("-o", "--output", help="Path to model file", type=str, default=config.OUTPUT_ANNOTATIONS)
    parser.add_argument("-p", "--annotation-prefix", help="Annotation prefix", type=str, default=config.ANNOTATION_PREFIX)

    args = parser.parse_args()
    model: List[SourceFileAnnotations] = extract_annotations(args.path, args.annotation_prefix, config.PARSER_EXCLUDE, config.PARSER_INCLUDE)
    export_annotations_to_json(model, args.output)


