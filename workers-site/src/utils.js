export function is_directory(path) {
  const bits = path.split('/')
  const last = bits[bits.length - 1]

  // does the final component contain a dot? technically there may be edge cases
  // here but this is fine for now!
  return !last.includes('.')
}