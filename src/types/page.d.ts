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
export type GraphQLNode = {
  frontmatter: FrontMattter
  fileAbsolutePath: string
  fields: Fields
}
export type GraphQLEdge = {
  node: GraphQLNode
}
// export type GraphQLEdge = GraphQLData['data']['allMarkdownRemark']['edges']
export type GraphQLData = {
  data: {
    allMarkdownRemark: {
      edges: GraphQLEdge[]
      // edges: { node: GraphQLNode }[]
    }
  }
}
