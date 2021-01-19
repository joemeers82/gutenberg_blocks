module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
    globals: {
        Atomics: "readonly",
        sharedArrayBuffer: "readonly",
        wp: "readonly"
    },
    parser: "babel-eslint", 
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "react/prop-types": "off"
    },
    "settings": {
        "react": {
          "version": "detect"
        }
    }
};
