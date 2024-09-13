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
  prefix: string
  identifier: string
  name: string
  description: string
  entity: string
  property: string
  method: string
  source: string
}

type EIConfigType = {
  markers: AnnotationMarkers
  server: {
    url: string
  }
  parser: {
    output: {
      entities: string
      annotations: string
    }
    exclude: string[]
    extend: Map<string, string>
  }
}
