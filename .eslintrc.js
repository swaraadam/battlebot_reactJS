module.exports = {
  env: {
    amd: true,
    browser: true,
    es6: true,
    jquery: false,
    node: true,
  },

  globals: {
    'Blockly': true,
  },

  extends: [
    "airbnb",
    "prettier",
    "prettier/react"
  ],

  parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules:{
    "linebreak-style": 0   // <----------
  },
  "prettier/prettier":[
    "error",
    {
      "trailingComma": "es6",
      "singleQuote": true,
      "printWidth": 120,
    }
  ],
  "plugins":[
    "prettier"
  ]
};
