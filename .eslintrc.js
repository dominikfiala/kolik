// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // "no-unused-vars": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  }
}
