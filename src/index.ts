import { createPlugin, utils } from 'stylelint'

import {
  hasPixelValue,
  hasRemValue,
  hasSupportedValue,
  isString,
  validBase,
  validSupportedValue,
} from './utils'

const { ruleMessages, validateOptions, report } = utils

const ruleName = 'plugin/8-point-grid'
const rules = {
  [ruleName]: { base: 8 },
}

const plugins = ['stylelint-8-point-grid']

const supportedCssProperties = [
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',

  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',

  'height',
  'min-height',
  'max-height',

  'width',
  'min-width',
  'max-width',

  'top',
  'bottom',
  'right',
  'left',

  // CSS Logical Properties
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',

  'padding-block',
  'padding-block-start',
  'padding-block-end',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',

  'block-size',
  'min-block-size',
  'max-block-size',

  'inline-size',
  'min-inline-size',
  'max-inline-size',

  'inset',
  'inset-block',
  'inset-inline',
  'inset-block-start',
  'inset-block-end',
  'inset-inline-start',
  'inset-inline-end',
]

// Ignore values with `calc` and sass variables
const ignoreList = ['calc', '\\$\\w+']

const pattern = (props: string[]): RegExp =>
  new RegExp(props.map((prop) => `^${prop}$`).join('|'))

const ignorePattern = new RegExp(ignoreList.join('|'))

const valid = (value: string): boolean =>
  hasSupportedValue(value) && !String(value).match(ignorePattern)

const messages = ruleMessages(ruleName, {
  invalid: (prop, actual, base) => {
    const baseRem = base / 16

    if (hasPixelValue(actual) && hasRemValue(actual))
      return `Invalid \`${prop}: ${actual}\`. Pixel values should be divisible by ${base} and rem values should be divisible by ${baseRem}.`

    if (hasPixelValue(actual))
      return `Invalid \`${prop}: ${actual}\`. Pixel values should be divisible by ${base}.`

    return `Invalid \`${prop}: ${actual}\`. Rem values should be divisible by ${baseRem}.`
  },
})

const { rule } = createPlugin(ruleName, (primaryOption) => {
  return (postcssRoot, postcssResult): void => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignorelist: supportedCssProperties,
        allowlist: hasSupportedValue,
        customProperties: isString,
      },
    })
    if (!validOptions) return

    const {
      allowlist = [],
      customProperties = [],
      ignorelist = [],
    } = primaryOption

    const properties = [...supportedCssProperties, ...customProperties].filter(
      (property) => !ignorelist.includes(property)
    )

    postcssRoot.walkDecls(pattern(properties), (decl) => {
      if (!valid(decl.value)) return
      if (!validSupportedValue(decl.value, primaryOption.base, allowlist)) {
        report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.invalid(decl.prop, decl.value, primaryOption.base),
        })
      }
    })
  }
})

export { rule, ruleName, plugins, messages, rules }
