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
export type mdx = {
  fileAbsolutePath: string
  html?: string
  body?: string
  frontmatter: FrontMattter
  fields: Fields
}
export type markdownRemarkEdge = {
  node: mdx
}
// export type markdownRemarkEdge = allMarkdownRemarkResult['data']['allMdx']['edges']
export type allMarkdownRemarkResult = {
  data: {
    allMdx: {
      edges: markdownRemarkEdge[]
      // edges: { node: mdx }[]
    }
  }
}
export type markdownRemarkResult = mdx & {
  data: { mdx: mdx & { html?: string; body: string } }
}
export type markdownPageContext = {
  weight: number
  parent: string
}
