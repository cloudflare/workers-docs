import React from "react"
import { withPrefix } from "gatsby"

export default ({ src, ...props }: { src: string; props: any[] }) => (
  <img src={withPrefix(src)} {...props} />
)
