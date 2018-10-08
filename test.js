const testRule = require('stylelint-test-rule-tape')
const eightPointGrid = require('./')

// base config
testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 8
  },

  accept: [
    { code: '.generic-card { margin-left: 8px; }' },
    { code: '.generic-card { padding-left: 64px; }' },
    { code: '.generic-card { height: 100%; }' },
    { code: '.generic-card { margin: 8px 16px; }' },
    { code: '.generic-card { margin: 8px 0; }' },
    { code: '.generic-card { margin: 8px 0px; }' },
    { code: '.generic-card { margin: -64px; }' },
    {
      code: `.generic-card { margin:
                                32px
                                16px; }`
    },
    { code: '.generic-card { line-height: 4px; }' },
    { code: '.generic-card { margin: 0 auto; }' },
    { code: '.generic-card { margin: 0px auto; }' },
    { code: '.generic-card { margin: 32px auto; }' },
    { code: '.generic-card { top: 0; }' },
    { code: '.generic-card { left: 32px; }' },
    // ignore for now
    { code: '.generic-card { width: calc(100% - 31px); }' },
    { code: '.generic-card { padding-left: $field-height; }' },
    {
      code:
        '.generic-card { padding: (($field-height - $line-height) / 2) 12px; }'
    }
  ],

  reject: [
    {
      code: '.generic-card { margin: 2px 8px; }',
      message: eightPointGrid.messages.invalid('margin', '2px 8px', 8)
    },
    {
      code: '.generic-card { padding-left: 60px; }',
      message: eightPointGrid.messages.invalid('padding-left', '60px', 8)
    },
    {
      code: '.generic-card { padding: 8px 8px   1px 8px; }',
      message: eightPointGrid.messages.invalid(
        'padding',
        '8px 8px   1px 8px',
        8
      )
    },
    {
      code: '.generic-card { width: 100px; }',
      message: eightPointGrid.messages.invalid('width', '100px', 8)
    },
    {
      code: '.generic-card { margin-top: -60px; }',
      message: eightPointGrid.messages.invalid('margin-top', '-60px', 8)
    },
    {
      code: `.generic-card { margin: 1px\n  2px; }`,
      message: eightPointGrid.messages.invalid('margin', '1px\n  2px', 8)
    },
    {
      code: '.generic-card { top: 1px; }'
    },
    {
      code: '.generic-card { left: 31px; }'
    }
  ]
})

// extended config
testRule(eightPointGrid.rule, {
  ruleName: eightPointGrid.ruleName,
  config: {
    base: 4,
    whitelist: ['2px', '1px'],
    ignore: ['width', 'max-height', 'margin-bottom']
  },

  accept: [
    { code: '.generic-card { margin-left: 8px; }' },
    { code: '.generic-card { padding-top: 64px; }' },
    { code: '.generic-card { width: 5px; }' },
    { code: '.generic-card { height: 1px; }' },
    { code: '.generic-card { height: 2px; }' },
    { code: '.generic-card { margin-left: 1px; }' },
    { code: '.generic-card { padding: 1px 2px 4px 4px; }' },
    { code: '.generic-card { margin: 2px 0; }' },
    { code: '.generic-card { max-height: 101px; }' },
    { code: '.generic-card { margin-bottom: 3px; }' }
  ],

  reject: [
    {
      code: '.generic-card { padding-left: 3px; }',
      message: eightPointGrid.messages.invalid('padding-left', '3px', 4)
    },
    {
      code: '.generic-card { height: 3px; }',
      message: eightPointGrid.messages.invalid('height', '3px', 4)
    },
    {
      code: '.generic-card { margin: 2px 11px; }',
      message: eightPointGrid.messages.invalid('margin', '2px 11px', 4)
    },
    {
      code: '.generic-card { margin: 1px 2px 3px 4px; }',
      message: eightPointGrid.messages.invalid('margin', '1px 2px 3px 4px', 4)
    }
  ]
})
