import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import pluginLingui from "eslint-plugin-lingui";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    {
        ignores: [".next", ".husky", ".vscode"],
    },
    pluginLingui.configs["flat/recommended"],
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "simple-import-sort": simpleImportSortPlugin,
        },
        rules: {
            "simple-import-sort/imports": [
                "warn",
                {
                    groups: [
                        // Lib ngoài (react, next, lodash, axios, @radix-ui/react-slot, ...)
                        ["^react", "^next", "^@?\\w"],

                        // Alias @/ và relative imports (./, ../) gộp chung,
                        // sẽ gom toàn bộ import trong project vào cùng 1 block
                        ["^@/"],
                        // ["^(?:@/|\\.\\.?/)"],

                        // Parent relative imports ../abc
                        // ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

                        // Sibling relative imports ./abc
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

                        // Import icon riêng (nếu muốn icon luôn nằm sau phần code project)
                        ["^@/icons(/.*|$)"],

                        // CSS/SCSS
                        ["^.+\\.s?css$"],

                        // Side effects (các virtual modules hoặc polyfill)
                        ["^\\u0000"],
                    ],
                },
            ],
            "simple-import-sort/exports": "warn",
            "max-len": [
                "warn",
                {
                    code: 120,
                    tabWidth: 2,
                    ignoreUrls: true,
                    ignoreStrings: false, // <--- Quan trọng
                    ignoreTemplateLiterals: true,
                    ignoreComments: true,
                },
            ],
        },
    },
];

export default eslintConfig;
