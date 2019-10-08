import Typography from "typography"
import { blue } from "ansi-colors"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  color: blue,
  headerFontFamily: [
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Georgia", "serif"],
})

export default typography
