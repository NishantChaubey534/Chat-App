module.exports = {
  "extends": "airbnb",
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false,
    "babelOptions": {
      "presets": ["@babel/preset-env", "@babel/preset-react"] // ✅ Ensure Babel knows React
    },
    "ecmaVersion": 2021,      // ✅ Allows modern JavaScript
    "sourceType": "module",   // ✅ Enables ES6 imports/exports
    "ecmaFeatures": {
      "jsx": true             // ✅ Enables JSX support
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "import/prefer-default-export": "off",
    "max-len": ["error", { "code": 250 }],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_d",
          "_dh",
          "_h",
          "_id",
          "_m",
          "_n",
          "_t",
          "_text"
        ]
      }
    ],
    "object-curly-newline": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to", "hrefLeft", "hrefRight"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "react/function-component-definition": "off"
  }
};
