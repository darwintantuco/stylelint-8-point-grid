const stylelint = require('stylelint')
const { createPlugin } = stylelint
const { ruleMessages, validateOptions, report } = stylelint.utils

const rules = {
  'plugin/8-point-grid': {
    base: 8
  }
}
const blacklist = ['margin', 'padding', 'height', 'width']
const plugins = ['stylelint-8-point-grid']
const ruleName = 'plugin/8-point-grid'
const messages = ruleMessages(ruleName, {
  invalid: (prop, actual, base) =>
    `Invalid \`${prop}: ${actual}\`. It should be divisible by ${base}.`
})

const pattern = props => new RegExp(props.join('|'))
const validBase = option => !isNaN(parseFloat(option)) && isFinite(option)
const validWhitelist = option => hasPixelValue(option)

const validPixelValue = (value, base, whitelist) => {
  return (
    value
      // Handle multiple px values
      // e.g. padding: 8px 8px 1px 8px
      .split(/ +/)
      .every(value => isWhitelist(whitelist, value) || divisibleBy(value, base))
  )
}

const hasPixelValue = value => String(value).includes('px')
const isWhitelist = (whitelist, value) =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value, base) => {
  const number = value.match(/\d+/)
  if (number === null) return false
  return Number(number) % Number(base) === 0
}

const rule = createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: blacklist,
        whitelist: validWhitelist
      }
    })
    if (!validOptions) return

    let props = blacklist
    const { ignore, whitelist } = primaryOption
    if (ignore) props = props.filter(prop => !ignore.includes(prop))

    postcssRoot.walkDecls(pattern(props), decl => {
      if (!hasPixelValue(decl.value)) return
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
