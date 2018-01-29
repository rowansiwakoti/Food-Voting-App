//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './',

        files: [

            '../app/assets/libs/bootstrap/bootstrap.min.css',
            '../app/assets/libs/angular/angular.min.js',
            '../app/assets/libs/angular/angular-ui-router.min.js',
            '../app/assets/libs/angular/ngStorage.min.js',
            '../app/assets/libs/angular/angular-animate.min.js',
            '../app/assets/libs/angular/angular-sanitize.min.js',
            '../app/assets/libs/angular/ui-bootstrap-tpls.min.js',
            '../app/assets/libs/jquery/jquery.min.js',
            '../app/assets/libs/jquery/popper.min.js',
            '../app/assets/libs/bootstrap/bootstrap.min.js',
            '../app/assets/libs/angular/angular-mocks.js',

            // source files
            '../app/app.module.js',
            '../app/app.config.js',
            '../app/components/**/*.js',
            '../app/constants/foa.constant.js',
            '../app/services/user.service.js',
            '../app/services/order.service.js',

            // spec files
            '../test/spec/app/components/login/login.controller.spec.js'
        ],

        exclude: ['test/e2e/**'],

        autoWatch: false,

        singleRun: true,

        port: 9876,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ]
    });
};
