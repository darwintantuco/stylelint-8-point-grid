const stylelint = require("stylelint");
const { createPlugin } = stylelint;
const { ruleMessages, validateOptions, report } = stylelint.utils;

const ruleName = "plugin/8-point-grid";
const messages = ruleMessages(ruleName, {
  invalid: (prop, actual, base) =>
    `Invalid \`${prop}: ${actual}\`. It should be divisible by ${base}.`
});

const pattern = props => new RegExp(props.join("|"));
const validBase = option => !isNaN(parseFloat(option)) && isFinite(option);
const validWhitelist = option => hasPixelValue(option);

const validPixelValue = (value, base, whitelist) => {
  if (/\s/.test(value)) {
    // Handles multiple px values
    // e.g. padding: 8px 8px 1px 8px
    values = value.split(/ +/);
    return values.every(
      value => isWhitelist(whitelist, value) || divisibleByBase(value, base)
    );
  }
  return isWhitelist(whitelist, value) || divisibleByBase(value, base);
};

const hasPixelValue = value => String(value).includes("px");
const isWhitelist = (whitelist, value) =>
  (whitelist && whitelist.includes(value)) || false;

const divisibleByBase = (value, base) => {
  const number = value.match(/\d+/);
  if (number === null) return false;
  return Number(number) % Number(base) === 0;
};

module.exports = createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: {
        base: validBase,
        ignore: ["margin", "padding", "height", "width"],
        whitelist: validWhitelist
      }
    });
    if (!validOptions) return;

    const { ignore, whitelist } = primaryOption;
    let props = ["margin", "padding", "height", "width"];
    if (ignore) props = props.filter(prop => !ignore.includes(prop));

    postcssRoot.walkDecls(pattern(props), decl => {
      if (!hasPixelValue(decl.value)) return;
      if (!validPixelValue(decl.value, primaryOption.base, whitelist)) {
        report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.invalid(decl.prop, decl.value, primaryOption.base)
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
