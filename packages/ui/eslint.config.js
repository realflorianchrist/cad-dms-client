import sharedConfig from "../../eslint.config.mjs"

export default [
  ...sharedConfig,
  {
    files: ["src/**/*.{ts,tsx}"],
    // Library modules may export helpers alongside components.
    rules: { "react-refresh/only-export-components": "off" },
  },
]
