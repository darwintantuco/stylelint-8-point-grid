const testRule = require("stylelint-test-rule-tape");
const eightPointGrid = require("./");

// Base Config
testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 8
  },

  accept: [
    { code: ".generic-card { margin-left: 8px; }" },
    { code: ".generic-card { padding-left: 64px; }" },
    { code: ".generic-card { height: 100%; }" },
    { code: ".generic-card { margin: 8px 16px; }" }
  ],

  reject: [
    {
      code: ".generic-card { margin: 2px 8px; }",
      message: eightPointGrid.messages.invalid("margin", "2px 8px", 8)
    },
    {
      code: ".generic-card { padding-left: 60px; }",
      message: eightPointGrid.messages.invalid("padding-left", "60px", 8)
    },
    {
      code: ".generic-card { padding: 8px 8px   1px 8px; }",
      message: eightPointGrid.messages.invalid(
        "padding",
        "8px 8px   1px 8px",
        8
      )
    },
    {
      code: ".generic-card { width: 100px; }",
      message: eightPointGrid.messages.invalid("width", "100px", 8)
    }
  ]
});

// Extended Config with custom base and ignore list
testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 4,
    whitelisted: ["1px"],
    ignore: "width"
  },

  accept: [
    { code: ".generic-card { margin-left: 8px; }" },
    { code: ".generic-card { padding-top: 64px; }" },
    { code: ".generic-card { width: 1px; }" },
    { code: ".generic-card { height: 1px; }" }
  ],

  reject: [
    {
      code: ".generic-card { padding-left: 3px; }",
      message: eightPointGrid.messages.invalid("padding-left", "3px", 4)
    }
  ]
});

// Extended Config with custom base and whitelisted
testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 4,
    whitelisted: ["2px", "1px"],
    ignore: ["margin", "padding"]
  },

  accept: [
    { code: ".generic-card { margin-left: 1px; }" },
    { code: ".generic-card { padding-top: 3px; }" },
    { code: ".generic-card { padding: 1px 2px 3px 4px; }" },
    { code: ".generic-card { height: 4px; }" },
    { code: ".generic-card { height: 2px; }" },
    { code: ".generic-card { height: 1px; }" }
  ],

  reject: [
    {
      code: ".generic-card { width: 3px; }",
      message: eightPointGrid.messages.invalid("width", "3px", 4)
    },
    {
      code: ".generic-card { height: 3px; }",
      message: eightPointGrid.messages.invalid("height", "3px", 4)
    }
  ]
});
