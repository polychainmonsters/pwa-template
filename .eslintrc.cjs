module.exports = {
  globals: { process: true, APP_VERSION: true, Buffer: true },
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": "off",
    "no-redeclare": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
