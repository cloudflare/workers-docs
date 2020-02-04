import { mdx } from '../types/mdx'

export const sortByWeight = (a: mdx, b: mdx): number => {
  let aWeight = a.frontmatter.weight === null ? 100 : a.frontmatter.weight
  let bWeight = b.frontmatter.weight === null ? 100 : b.frontmatter.weight
  return aWeight > bWeight ? 1 : aWeight === bWeight ? 0 : -1
}
// export const sortByWeight = (a, b) => {
//   let aWeight = a.frontmatter.weight === null ? 100 : a.frontmatter.weight
//   let bWeight = b.frontmatter.weight === null ? 100 : b.frontmatter.weight
//   return aWeight  bWeight ? 1 : aWeight === bWeight ? 0 : -1
//   // a - b
//   // 1  2 => -1 a < b
//   // 1  1 =>  0
//   // 2 -1 =>  1, a > b
// }
// const ba = [
//   { frontmatter: { weight: 1 } },
//   { frontmatter: { weight: null } },
//   { frontmatter: { weight: 10 } },
//   { frontmatter: { weight: 2 } },
//   { frontmatter: { weight: 0 } },
// ]
