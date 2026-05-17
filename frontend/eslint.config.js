import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1. Apply core JavaScript recommended rules
  js.configs.recommended,

  // 2. Apply React flat config recommended rules
  pluginReact.configs.flat.recommended,

  // 3. Apply custom configuration for your source files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "react/react-in-jsx-scope": "off",
    },
    // 👇 ADD THIS SETTINGS BLOCK TO FIX THE WARNING 👇
    settings: {
      react: {
        version: "detect", 
      },
    },
  },
];
