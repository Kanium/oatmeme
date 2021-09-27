module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        amd: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended' // Make sure this is always the last element in the array.
    ],
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                semi: false,
                trailingComma: 'none',
                singleQuote: true,
                printWidth: 120,
                tabWidth: 4,
                arrowPerins: 'always',
                endOfLine: 'auto'
            },
            { usePrettierrc: true }
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prefer-const': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
}
