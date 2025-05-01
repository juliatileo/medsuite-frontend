import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import-helpers": importHelpers,
      import: fixupPluginRules(_import),
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["tsconfig.json"],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            "module",
            "/^src/",
            "/^components/",
            "/^shared/",
            "/^utils/",
          ],
          alphabetize: {
            order: "asc",
            ignoreCase: true,
          },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
      "no-duplicate-imports": 2,
      "ordered-imports": 0,
      "variable-name": 0,
      "import-name": 0,
      "import/prefer-default-export": 0,
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
        },
      ],
    },
  }
);
