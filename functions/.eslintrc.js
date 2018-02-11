module.exports = {
    "extends": "airbnb",
    "env": { "browser": true, "jest": true },
    "rules": {
        "no-console": 1,
        "no-multiple-empty-lines": [2, { "max": 1, "maxEOF": 1, "maxBOF": 0 }],
        "newline-before-return": 2,
        "react/jsx-filename-extension": 0,
        "react/require-default-props": 0,
		"indent": ["error", 4],
        "react/jsx-indent": [1, 4],
        "react/jsx-indent-props": [1, 4],
        "no-underscore-dangle": [2],
        "max-len": [2, {"ignoreComments": true}],
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0
    }
};
