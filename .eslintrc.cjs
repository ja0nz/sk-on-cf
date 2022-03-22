module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["svelte3", "@typescript-eslint"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {},
  settings: {
    "svelte3/typescript": true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
