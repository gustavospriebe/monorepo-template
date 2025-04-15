import globals from "globals";
import { baseConfig } from "./index.js";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
