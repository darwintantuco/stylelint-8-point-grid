const stylelint = require("stylelint");
const { createPlugin } = stylelint;
const { ruleMessages, validateOptions, report } = stylelint.utils;

const ruleName = "plugin/8-point-grid";
const messages = ruleMessages(ruleName, {
  invalid: (prop, expected) => `${prop} should be divisible by ${expected}.`
});

const validBase = option => !isNaN(parseFloat(option)) && isFinite(option);

const validPixelValue = (value, base) => {
  if (/\s/.test(value)) {
    // Handles multiple px values
    // e.g. padding: 8px 8px 1px 8px
    values = value.split(/ +/);
    return values.every(value => {
      if (!hasPixelUnit(value)) return true;
      return divisibleByBase(value, base);
    });
  } else {
    if (!hasPixelUnit(value)) return true;
    return divisibleByBase(value, base);
  }
};

const hasPixelUnit = value => String(value).includes("px");

const divisibleByBase = (value, base) => {
  const number = value.match(/\d+/);
  if (number === null) return false;
  return Number(number) % Number(base) === 0;
};

const pattern = props => new RegExp(props.join("|"));

module.exports = createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: ["margin", "padding", "height", "width"]
      }
    });

    if (!validOptions) return;

    let props = ["margin", "padding", "height", "width"];
    if (primaryOption.ignore)
      props = props.filter(prop => !primaryOption.ignore.includes(prop));

    postcssRoot.walkDecls(pattern(props), decl => {
      if (!validPixelValue(decl.value, primaryOption.base)) {
        report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.invalid(decl.prop, primaryOption.base)
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
module.exports.plugins = ["stylelint-8-point-grid"];
module.exports.rules = {
  "plugin/8-point-grid": {
    base: 8
  }
};
