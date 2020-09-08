module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    "indent": [
      "error",
      2
    ],
    'react/react-in-jsx-scope': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-restricted-globals': 0,
    'no-plusplus': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-expressions': 0,
  },
};
