interface CommentConfig {
  lineComment?: string
  blockComment?: [string, string]
}

type LanguageId = string
type ConfigPath = string
type LanguageExtenssion = string
type command = string

type Snippets = Record<string, string>

type AnnotationMarkers = {
  identifier: string
  name: string
  type: string
  description: string
  entity: string
  property: string
  method: string
  source: string
}

type EIConfigType = {
  prefix: string
  markers: AnnotationMarkers,
  output: {
    entities: string
    annotations: string
  }
  server: {
    url: string
  }
  parser: {
    exclude: string[]
    extend: Map<string, string>
  }
}
