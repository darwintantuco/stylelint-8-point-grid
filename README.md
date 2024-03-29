# stylelint-8-point-grid

![Node.js CI](https://github.com/darwintantuco/stylelint-8-point-grid/workflows/Node.js%20CI/badge.svg)

Validates any defined `margin`, `padding`, `height`, and `width`.

Supports pixel and rem values.

![](demo.png)

## Inspiration

- [Intro to The 8-Point Grid System](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632)
- [The 8-Point Grid](https://spec.fm/specifics/8-pt-grid)

### Ignores

- css `calc()` function
- sass variables

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

Update `.stylelintrc` or stylelint config in `package.json`.

### Recommended config

```js
// .stylelintrc
{
  "extends": [
    "stylelint-8-point-grid"
  ]
}
```

Uses base 8 for pixel values (and base 0.5 for rem values).

## Extending the config

```js
// .stylelintrc
{
  "extends": [
    "stylelint-8-point-grid"
  ],
  "rules": {
    "plugin/8-point-grid": {
      "base": 4,
      "allowlist": ["2px", "1px", "0.0625rem"],
      "customProperties": ['size', 'position'],
      "ignorelist": ["width", "height"]
    }
  }
}
```

### base

- value used for divisibility checking
- base value is 8 by default
- used to compute the base for rem values (`base / 16`)

using 4 as base means:

- pixel values should be divisible by 4
- rem values should be divisible by 0.25

### customProperties

- array of custom properties, useful when you use custom shorthand properties like [postcss-short](https://github.com/csstools/postcss-short)

### allowlist

- array of pixel or rem values to be excluded from divisibility checking

### ignorelist

- array of css properties to be excluded from divisibility checking
- supported values:
  - margin
  - margin-top
  - margin-bottom
  - margin-left
  - margin-right
  - padding
  - padding-top
  - padding-bottom
  - padding-left
  - padding-right
  - height
  - min-height
  - max-height
  - width
  - min-width
  - max-width
  - top
  - bottom
  - right
  - left
  - margin-block
  - margin-block-start
  - margin-block-end
  - margin-inline
  - margin-inline-start
  - margin-inline-end
  - padding-block
  - padding-block-start
  - padding-block-end
  - padding-inline
  - padding-inline-start
  - padding-inline-end
  - block-size
  - min-block-size
  - max-block-size
  - inline-size
  - min-inline-size
  - max-inline-size
  - inset
  - inset-block
  - inset-inline
  - inset-block-start
  - inset-block-end
  - inset-inline-start
  - inset-inline-end

## License

MIT
