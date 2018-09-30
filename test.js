var testRule = require("stylelint-test-rule-tape");
var eightPointGrid = require("./");

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
      message: eightPointGrid.messages.invalid("margin", 8)
    },
    {
      code: ".generic-card { padding-left: 60px; }",
      message: eightPointGrid.messages.invalid("padding-left", 8)
    },
    {
      code: ".generic-card { padding: 8px 8px   1px 8px; }",
      message: eightPointGrid.messages.invalid("padding", 8)
    },
    {
      code: ".generic-card { width: 100px; }",
      message: eightPointGrid.messages.invalid("width", 8)
    }
  ]
});

testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 4
  },

  accept: [
    { code: ".generic-card { margin-left: 8px; }" },
    { code: ".generic-card { padding-top: 64px; }" }
  ],

  reject: [
    {
      code: ".generic-card { padding-left: 3px; }",
      message: eightPointGrid.messages.invalid("padding-left", 4)
    }
  ]
});

testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 4,
    ignore: ["margin", "padding"]
  },

  accept: [
    { code: ".generic-card { margin-left: 1px; }" },
    { code: ".generic-card { padding-top: 3px; }" },
    { code: ".generic-card { padding: 1px 2px 3px 4px; }" },
    { code: ".generic-card { height: 4px; }" }
  ],

  reject: [
    {
      code: ".generic-card { width: 3px; }",
      message: eightPointGrid.messages.invalid("width", 4)
    },
    {
      code: ".generic-card { height: 3px; }",
      message: eightPointGrid.messages.invalid("height", 4)
    }
  ]
});
