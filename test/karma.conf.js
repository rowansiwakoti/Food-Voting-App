//jshint strict: false
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
            '../app/assets/libs/angular/angular-mocks.js',
            '../app/assets/libs/jquery/jquery.min.js',
            '../app/assets/libs/jquery/popper.min.js',
            '../app/assets/libs/bootstrap/bootstrap.min.js',

            // source files
            '../app/app.module.js',
            '../app/app.config.js',
            '../app/components/**/*.js',
            '../app/components/modal/**/*.js',
            '../app/services/**/*.js',
            '../app/constants/**/*.js',
            // '../app/components/login/login.controller.js',
            '../app/services/user.service.js',
            // '../app/constants/foa.constant.js',
            // '../app/components/modal/cart/cart.controller.js',

            // spec files
            '../test/spec/app/services/order.service.spec.js',
            '../test/spec/app/services/user.service.spec.js',
            '../test/spec/app/components/footer/footer.controller.spec.js',
            '../test/spec/app/components/login/login.controller.spec.js',
            '../test/spec/app/components/dashboard/dashboard.controller.spec.js',
            '../test/spec/app/components/header/header.controller.spec.js',
            '../test/spec/app/components/modal/cart/cart.controller.spec.js',
            '../test/spec/app/components/modal/food/food.controller.spec.js',
            '../test/spec/app/components/modal/notification/notification.controller.spec.js',
            '../test/spec/app/components/order-bill/order-bill.controller.spec.js',
            '../test/spec/app/components/order-list/order-list.controller.spec.js',
            '../test/spec/app/components/restaurant/restaurant.controller.spec.js',
            '../test/spec/app/components/modal/order/order.modal.controller.spec.js',
            '../test/spec/app/components/registration-success/registration-success.controller.spec.js',
            '../test/spec/app/components/modal/profile/user-profile.controller.spec.js'
        ],

        // exclude: ['test/e2e/**'],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        singleRun: true,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '../app/components/**/*.js': ['coverage'],
            '../app/services/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/',
            check: {
                global: {
                    statements: 85,
                    lines: 85,
                    functions: 85,
                    branches: 83
                }
            }
        }

    });
};