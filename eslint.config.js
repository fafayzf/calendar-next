import antfu from '@antfu/eslint-config'

export default antfu(
  {
    files: ['**/*.ts'],
    rules: {
      'semi': 0,
      'no-unused-imports': 0,
      // 'prefer-const': 'error',
    },
  },
)
