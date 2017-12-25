exports.config = {

  allScriptsTimeout: 11000,

  specs: [
      'e2e/login/login.e2e.js',
      'e2e/dashboard/dashboard.e2e.js',
      'e2e/register/register.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};