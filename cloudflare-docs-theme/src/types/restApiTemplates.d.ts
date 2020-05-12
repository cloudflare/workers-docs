export type restApiTemplate = {
  repository_url: string | null
  code: string | null
  share_url: string | null
  weight: number
  url: string | null
  tags: string[] | null
  title: string
  endpointId: string
  description: string
  type: string
  demos: {
    [key: string]: {
      share_url?: string | null
      tags?: string[] | null
      text: string
      url: string
    } | null
  } | null
}
export type allRestApiTemplates = {
  data: {
    allRestApiTemplates: {
      edges: {
        node: restApiTemplate
      }[]
    }
  }
}
export type restApiTemplateResult = {
  data: {
    restApiTemplates: restApiTemplate
  }
}
