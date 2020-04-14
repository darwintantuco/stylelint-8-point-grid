import { createPlugin, utils } from 'stylelint'

import { validBase, hasPixelValue, validPixelValue } from './utils'

const { ruleMessages, validateOptions, report } = utils

const ruleName = 'plugin/8-point-grid'
const rules = {
  [ruleName]: { base: 8 },
}

const plugins = ['stylelint-8-point-grid']

const blacklist = [
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
]

// ignore values with `calc` and sass variables
const unsupported = ['calc', '\\$\\w+']

const pattern = (props: string[]): RegExp =>
  new RegExp(props.map((prop) => `^${prop}$`).join('|'))

const unsupportedPattern = new RegExp(unsupported.join('|'))

const valid = (value: string): boolean =>
  hasPixelValue(value) && !String(value).match(unsupportedPattern)

const messages = ruleMessages(ruleName, {
  invalid: (prop, actual, base) =>
    `Invalid \`${prop}: ${actual}\`. It should be divisible by ${base}.`,
})

const rule = createPlugin(ruleName, (primaryOption) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: blacklist,
        whitelist: hasPixelValue,
      },
    })
    if (!validOptions) return

    let props = blacklist
    const { ignore, whitelist } = primaryOption
    if (ignore) props = props.filter((prop) => !ignore.includes(prop))

    postcssRoot.walkDecls(pattern(props), (decl) => {
      if (!valid(decl.value)) return
      if (!validPixelValue(decl.value, primaryOption.base, whitelist)) {
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

module.exports = { ...rule, plugins, messages, rules }
