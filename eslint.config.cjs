const { defineConfig, globalIgnores } = require("eslint/config");
const { fixupConfigRules } = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {},
      parser: tsParser
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
      )
    ),

    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "internal"],

          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    }
  },
  globalIgnores(["**/dist", "**/.eslintrc.cjs"])
]);
