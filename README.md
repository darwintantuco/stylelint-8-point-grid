# stylelint-8-point-grid
[![Build Status](https://travis-ci.org/dcrtantuco/stylelint-8-point-grid.svg?branch=master)](https://travis-ci.org/dcrtantuco/stylelint-8-point-grid)

Validates any defined `height`, `width`, `padding` and `margin`

![](demo.png)

## Why?
- [Intro to The 8-Point Grid System](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632)
- [The 8-Point Grid](https://spec.fm/specifics/8-pt-grid)


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
### Recommended config
```js
// .stylelintrc
{
  "extends": [
    "stylelint-8-point-grid"
  ]
}
```

## Extending the config
### base (default: 8)
- value used for divisibility checking
### ignore (default: [ ])
- array of properties to be excluded from divisibility checking
- supported values: `height`, `width`, `padding`, `margin`
### whitelist (default: [ ])
- array of px values to be excluded from divisibility checking
```js
// .stylelintrc
{
  "extends": [
    "stylelint-8-point-grid"
  ],
  "rules": {
    "plugin/8-point-grid": {
      "base": 4,
      "whitelist": ["2px", "1px"]
      "ignore": ["width", "height"]
    }
  }
}
```
