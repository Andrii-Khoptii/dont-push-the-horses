import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    formatters: {
      css: true,
      html: true,
      json: true,
      markdown: 'prettier',
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      'no-undef': 0,
      'vue/multi-word-component-names': 0,
      'unused-imports/no-unused-vars': 1,
    },
  },
);
