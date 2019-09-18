module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    },
    "globals": {
        "SENTRY_ENABLED": true,

        "jest": true,
        "describe": true,
        "test": true,
        "expect": true,
        "beforeEach": true,
        "afterEach": true
    },
};