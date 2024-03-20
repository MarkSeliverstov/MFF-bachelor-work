from dataclasses import dataclass
from typing import List, Optional

# @lc-entity 
# @lc-identifier :Annotation
# @lc-name Annotation
# @lc-description Base class for all annotations.
@dataclass
class Annotation:
    # @lc-property
    # @lc-name name
    name: str
    # @lc-property
    # @lc-name value
    value: Optional[str]
    # @lc-property
    # @lc-name line
    line: int


# @lc-entity
# @lc-identifier :SourceFileAnotations
# @lc-name SourceFileAnotations
# @lc-description Represent a single resource file.
@dataclass
class SourceFileAnnotations:
    # @lc-property
    # @lc-name relativeFilePath
    # @lc-description Relative path to the file.
    relative_file_path: str
    # @lc-property
    # @lc-name annotations
    # @lc-description Annotations found in given file.
    annotations: List[Annotation]


