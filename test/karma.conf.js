//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
        '../app/assets/libs/angular/angular.min.js',
        '../app/assets/libs/angular/angular-ui-router.min.js',
        '../app/assets/libs/angular/angular-mocks.js',
        '../app/app.module.js',
        '../app/components/login/login.controller.js',
        '../test/spec/components//login/login.controller.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
