// @lc-entity
// @lc-identifier :Annotation
// @lc-name Annotation
// @lc-description Base class for all annotations.
export interface IAnnotation{
    // @lc-property
    // @lc-name name
    name: string;
    // @lc-property
    // @lc-name value
    value: string | null;
    // @lc-property
    // @lc-name annotationStartPos
    startPos: number;
    // @lc-property
    // @lc-name annotationEndPos
    endPos: number;
    // @lc-property
    // @lc-name annotationLine    
    lineNumber: number;
}


// @lc-entity
// @lc-identifier :SourceFileAnotations
// @lc-name SourceFileAnotations
// @lc-description Represent a single resource file.
export interface SourceFileAnnotations{
    // @lc-property
    // @lc-name relativeFilePath
    // @lc-description Relative path to the file.
    relativeFilePath: string;
    // @lc-property
    // @lc-name annotations
    // @lc-description Annotations found in given file.
    annotations: IAnnotation[]
}


// @lc-entity
// @lc-identifier :AnotationModel
// @lc-name AnotationModel
// @lc-description Anotation model.
export interface AnnotationModel{
    // @lc-property
    // @lc-name filesAnotations
    filesAnnotations: SourceFileAnnotations[];
}
