// jshint strict: false
module.exports = function (config) {

    config.set({

        basePath: './',

        files: [

            '../app/assets/libs/angular/angular.min.js',
            '../app/assets/libs/angular/angular-messages.min.js',
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
            './spec/app/components/footer/footer.controller.spec.js',
            './spec/app/components/restaurant/restaurant.controller.spec.js',
            './spec/app/components/register/register.controller.spec.js',
            './spec/app/components/registration-success/registration-success.controller.spec.js',
            './spec/app/components/order-list/order-list.controller.spec.js',
            './spec/app/components/order-bill/order-bill.controller.spec.js'
        ],

        exclude: ['test/e2e/**'],

        autoWatch: true,

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
