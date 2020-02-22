const stylelint = require('stylelint')
const { createPlugin } = stylelint
const { ruleMessages, validateOptions, report } = stylelint.utils

const rules = {
  'plugin/8-point-grid': {
    base: 8
  }
}

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
  'left'
]

const plugins = ['stylelint-8-point-grid']

const ruleName = 'plugin/8-point-grid'

const messages = ruleMessages(ruleName, {
  invalid: (prop, actual, base) =>
    `Invalid \`${prop}: ${actual}\`. It should be divisible by ${base}.`
})

const pattern = props =>
  new RegExp(props.map(prop => '^' + prop + '$').join('|'))

const validBase = val => !isNaN(parseFloat(val)) && isFinite(val)

const hasPxValue = val => String(val).includes('px')

const validPixelValue = (value, base, whitelist) => {
  return (
    // handle multiple px values
    //   e.g. padding: 8px 8px 1px 8px or padding: 3em 8px 8px 8px;
    value
      .split(/[\s\r\n]+/)
      .filter(hasPxValue)
      .every(value => isWhitelist(whitelist, value) || divisibleBy(value, base))
  )
}

// ignore values with `calc` and sass variables
const unsupported = ['calc', '\\$\\w+']

const unsupportedPattern = new RegExp(unsupported.join('|'))

const valid = val => hasPxValue(val) && !String(val).match(unsupportedPattern)

const isWhitelist = (whitelist, value) =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value, base) => {
  const number = value.match(/\d+/)
  if (isNaN(number)) return true
  return Number(number) % Number(base) === 0
}

const rule = createPlugin(ruleName, primaryOption => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: blacklist,
        whitelist: hasPxValue
      }
    })
    if (!validOptions) return

    let props = blacklist
    const { ignore, whitelist } = primaryOption
    if (ignore) props = props.filter(prop => !ignore.includes(prop))

    postcssRoot.walkDecls(pattern(props), decl => {
      if (!valid(decl.value)) return
      if (!validPixelValue(decl.value, primaryOption.base, whitelist)) {
        report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.invalid(decl.prop, decl.value, primaryOption.base)
        })
      }
    })
  }
})

module.exports = { ...rule, plugins, messages, rules }
