export type FrontMattter = {
  title: string
  alwaysopen: boolean | null
  hidden: boolean | null
  showNew: boolean | null
  weight: number | null
}
export type Fields = {
  pathToServe: string
  parent: string
  filePath: string
}
// The values from GraphQl + Remark we care about
export type markdownRemark = {
  fileAbsolutePath: string
  html?: string
  frontmatter: FrontMattter
  fields: Fields
}
export type markdownRemarkEdge = {
  node: markdownRemark
}
// export type markdownRemarkEdge = allMarkdownRemarkResult['data']['allMarkdownRemark']['edges']
export type allMarkdownRemarkResult = {
  data: {
    allMarkdownRemark: {
      edges: markdownRemarkEdge[]
      // edges: { node: markdownRemark }[]
    }
  }
}
export type markdownRemarkResult = markdownRemark & {
  data: { markdownRemark: markdownRemark & { html?: string } }
}
export type markdownPageContext = {
  weight: number
  parent: string
}
