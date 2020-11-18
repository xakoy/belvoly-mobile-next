/** @format */

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    settings: {},
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
}
