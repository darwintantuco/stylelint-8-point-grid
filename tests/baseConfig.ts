import testRule from 'stylelint-test-rule-tape'
import { rule, ruleName, messages } from '../src/index'

testRule(rule, {
  ruleName: ruleName,
  config: {
    base: 8,
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
                                16px; }`,
    },
    { code: '.generic-card { line-height: 4px; }' },
    { code: '.generic-card { margin: 0 auto; }' },
    { code: '.generic-card { margin: 0px auto; }' },
    { code: '.generic-card { margin: 32px auto; }' },
    { code: '.generic-card { top: 0; }' },
    { code: '.generic-card { left: 32px; }' },
    { code: '.generic-card { padding-left: 8px; padding-top: 16px; }' },
    { code: '.generic-card { padding: 3em 8px 8px 8px; }' },

    // Handle CSS Logical Properties
    { code: '.generic-card { block-size: 64px; }' },
    { code: '.generic-card { margin-block-start: 8px; }' },

    // Handle valid rem values
    { code: '.generic-card { margin-left: 0.5rem; }' },
    { code: '.generic-card { margin: 0.5rem 1rem; }' },

    // Ignore css calc() function
    { code: '.generic-card { width: calc(100% - 31px); }' },

    // Ignore sass variables
    { code: '.generic-card { padding-left: $field-height; }' },
    {
      code:
        '.generic-card { padding: (($field-height - $line-height) / 2) 12px; }',
    },
  ],

  reject: [
    {
      code: '.generic-card { margin: 2px 8px; }',
      message: messages.invalid('margin', '2px 8px', 8),
    },
    {
      code: '.generic-card { padding-left: 60px; }',
      message: messages.invalid('padding-left', '60px', 8),
    },
    {
      code: '.generic-card { padding: 8px 8px   1px 8px; }',
      message: messages.invalid('padding', '8px 8px   1px 8px', 8),
    },
    {
      code: '.generic-card { width: 100px; }',
      message: messages.invalid('width', '100px', 8),
    },
    {
      code: '.generic-card { margin-top: -60px; }',
      message: messages.invalid('margin-top', '-60px', 8),
    },
    {
      code: `.generic-card { margin: 1px\n  2px; }`,
      message: messages.invalid('margin', '1px\n  2px', 8),
    },
    {
      code: '.generic-card { top: 1px; }',
      message: messages.invalid('top', '1px', 8),
    },
    {
      code: '.generic-card { left: 31px; }',
      message: messages.invalid('left', '31px', 8),
    },
    {
      code: '.generic-card { padding-left: 8px; padding-top: 5px; }',
      message: messages.invalid('padding-top', '5px', 8),
    },

    // Handle invalid rem values
    {
      code: '.generic-card { margin-left: 0.4rem; }',
      message: messages.invalid('margin-left', '0.4rem', 8),
    },
    {
      code: '.generic-card { margin: 0.5rem 1.1rem; }',
      message: messages.invalid('margin', '0.5rem 1.1rem', 8),
    },

    // Handle valid rem values with invalid px value
    {
      code: '.generic-card { padding: 1px 0.5rem 1.5rem 2rem; }',
      message: messages.invalid('padding', '1px 0.5rem 1.5rem 2rem', 8),
    },

    // Handle valid px values with invalid rem value
    {
      code: '.generic-card { padding: 8px 0.4rem 1.5rem 2rem; }',
      message: messages.invalid('padding', '8px 0.4rem 1.5rem 2rem', 8),
    },

    // Handle invalid CSS Logical Properties
    {
      code: '.generic-card { block-size: 63px; }',
      message: messages.invalid('block-size', '63px', 8),
    },
    {
      code: '.generic-card { margin-block-start: 7px; }',
      message: messages.invalid('margin-block-start', '7px', 8),
    },
  ],
})
