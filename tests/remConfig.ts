import testRule from 'stylelint-test-rule-tape'
import { rule, ruleName, messages } from '../src/index'

const base = 0.5

testRule(rule, {
  ruleName: ruleName,
  config: {
    base,
    whitelist: ['1px'],
    ignore: ['width', 'max-height', 'margin-bottom'],
  },

  accept: [
    { code: '.generic-card { margin-left: 0.5rem; }' },
    { code: '.generic-card { padding-top: 4rem; }' },
    { code: '.generic-card { width: 0.3125rem; }' },
    { code: '.generic-card { height: 1rem; }' },
    { code: '.generic-card { margin-left: 1px; }' },
    { code: '.generic-card { padding: 1px 0.5rem 1.5rem 2rem; }' },
    { code: '.generic-card { margin: 1rem 0; }' },
    { code: '.generic-card { max-height: 1rem; }' },
    { code: '.generic-card { margin-bottom: 2rem; }' },
  ],

  reject: [
    {
      code: '.generic-card { padding-left: 0.125rem; }',
      message: messages.invalid('padding-left', '0.125rem', base),
    },
    {
      code: '.generic-card { height: 0.1875rem; }',
      message: messages.invalid('height', '0.1875rem', base),
    },
    {
      code: '.generic-card { margin: 0.5rem 0.6875rem; }',
      message: messages.invalid('margin', '0.5rem 0.6875rem', base),
    },
    {
      code: '.generic-card { margin: 1px 0.125rem 2rem 1.5rem; }',
      message: messages.invalid('margin', '1px 0.125rem 2rem 1.5rem', base),
    },
  ],
})
