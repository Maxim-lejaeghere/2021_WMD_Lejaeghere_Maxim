module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
  },
  'rules': {
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', {'ignoreComments': true, 'ignoreStrings': true, 'ignoreRegExpLiterals': true}],
    'require-jsdoc': 'off',
  },
};
