const stylelint = require("stylelint");
const { createPlugin } = stylelint
const { ruleMessages, validateOptions, report } = stylelint.utils;

const ruleName = "plugin/8-point-grid";
const messages = ruleMessages(ruleName, {
  invalid: "Px values should be divisible by 8."
});


const validBase = option => {
  return !isNaN(parseFloat(option)) && isFinite(option);
};

const validPixelValue = (value, base) => {
  // wat
  // Handles when a value contains multiple px values
  // E.g.
  // padding-left: 8px 8px 1px 8px
  if (/\s/.test(value)) {
    values = value.split(/ +/)
    return values.every(value => {
      if (!hasPixelUnit(value)) {
        return true
      }
      return checkDivisibility(value, base)
    })
  } else {
    if (!hasPixelUnit(value)) return true
    return checkDivisibility(value, base)
  }
}

const hasPixelUnit = value => {
  return String(value).includes("px")
}

const checkDivisibility = (value, base) => {
  return (Number(value.match(/\d+/)[0] % Number(base)) === 0)
}

const pattern = props => {
  return new RegExp(props.join("|"))
}

module.exports = createPlugin(ruleName, function(primaryOption, secondaryOption) {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: ["margin", "padding", "height", "width"]
      }
    });

    if (!validOptions) return;

    let properties = ["margin", "padding", "height", "width"]
    if (primaryOption.ignore) {
      // wat
      properties = properties.filter(prop => !primaryOption.ignore.includes(prop))
    }

    postcssRoot.walkDecls(pattern(properties), function(decl) {
      if (!validPixelValue(decl.value, primaryOption.base)) {
        report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.invalid
        });
      }
    })
  }
})

// wat
module.exports.ruleName = ruleName;
module.exports.messages = messages;
module.exports.extends = "stylelint-8-point-grid";
module.exports.rules = { base: 8 };
