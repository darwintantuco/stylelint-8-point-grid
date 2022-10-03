import testRule from 'stylelint-test-rule-tape'
import { rule, ruleName, messages } from '../src/index'

testRule(rule, {
  ruleName: ruleName,
  config: {
    base: 4,
    allowlist: ['2px', '1px', '1.6rem', '0.0625rem'],
    ignorelist: ['width', 'max-height', 'margin-bottom', 'margin-block'],
  },

  accept: [
    { code: '.generic-card { margin-left: 8px; }' },
    { code: '.generic-card { padding-top: 64px; }' },
    { code: '.generic-card { height: 1px; }' },
    { code: '.generic-card { height: 2px; }' },
    { code: '.generic-card { margin-left: 1px; }' },
    { code: '.generic-card { padding: 1px 2px 4px 4px; }' },
    { code: '.generic-card { margin: 2px 0; }' },

    // Handle CSS Logical Properties
    { code: '.generic-card { block-size: 64px; }' },
    { code: '.generic-card { margin-block-start: 8px; }' },

    // Handle ignorelist
    { code: '.generic-card { width: 5px; }' },
    { code: '.generic-card { max-height: 101px; }' },
    { code: '.generic-card { margin-bottom: 3px; }' },
    { code: '.generic-card { margin-block: 3px; }' },

    // Handle valid rem values
    { code: '.generic-card { height: 0.75rem; }' },
    { code: '.generic-card { margin-left: 1.6rem; }' },
    { code: '.generic-card { margin-left: 0.0625rem; }' },
  ],

  reject: [
    {
      code: '.generic-card { padding-left: 3px; }',
      message: messages.invalid('padding-left', '3px', 4),
    },
    {
      code: '.generic-card { height: 3px; }',
      message: messages.invalid('height', '3px', 4),
    },
    {
      code: '.generic-card { margin: 2px 11px; }',
      message: messages.invalid('margin', '2px 11px', 4),
    },
    {
      code: '.generic-card { margin: 1px 2px 3px 4px; }',
      message: messages.invalid('margin', '1px 2px 3px 4px', 4),
    },

    // Handle invalid rem values
    { code: '.generic-card { margin-left: 1.7rem; }' },
  ],
})
