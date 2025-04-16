import config from "@newcompany/eslint-config/node.js";

export default [
  {
    ignores: ["src/db.d.ts"],
  },
  ...config,
];
