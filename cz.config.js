/** @type {import('cz-git').UserConfig} */
export default {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'style', name: 'style:    CSS / styling or markup changes' },
    {
      value: 'refactor',
      name: 'refactor: Code change that neither fixes a bug nor adds a feature'
    },
    { value: 'perf', name: 'perf:     Performance improvements' },
    {
      value: 'chore',
      name: 'chore:    Build, configs, dependencies, or tooling'
    },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'revert', name: 'revert:   Revert a previous commit' }
  ],
  skipQuestions: [
    'scope',
    'customScope',
    'breaking',
    'markBreaking',
    'footerPrefix',
    'customFooterPrefix',
    'footer'
  ]
};
