/* eslint-env node */
module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'plugin:vue/base',
        'plugin:vuetify/base',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        // indent: [
        //     'error',
        //     4
        // ],
        'space-before-function-paren': [
            'warn',
            'always'
        ]
    }
}
