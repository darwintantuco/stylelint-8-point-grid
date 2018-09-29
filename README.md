# stylelint-8-point-grid
[![Build Status](https://travis-ci.org/dcrtantuco/stylelint-8-point-grid.svg?branch=master)](https://travis-ci.org/dcrtantuco/stylelint-8-point-grid)
Stylelint plugin to validate 8-point grid rules

Checks any defined `height`, `width`, `padding` or `margin` in `pixels`

## Installation
### npm
```
npm install stylelint-8-point-grid --save-dev
```
### yarn
```
yarn add stylelint-8-point-grid --dev
```

## Usage
### Basic
Update .stylelintrc or stylint config in `package.json`
```js
// .stylelintrc
{
  "extends": [
    "stylelint-8-point-grid"
  ]
}
```

### Secondary Options
Override default base value and properties
```js
// .stylelintrc
{
  "plugin": [
    "stylelint-8-point-grid"
  ],
  "rules": {
    "plugin/8-point-grid": {
      "base": 8,
      "ignore": ["width", "padding"]
    }
  }
}
```