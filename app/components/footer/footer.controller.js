(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('FooterController', FooterController);
    FooterController.$inject = ['APP_CONSTANT'];

    function FooterController(APP_CONSTANT) {

        var vm = this;

        var appName = APP_CONSTANT.APP_NAME;

        vm.getAppName = function () {
            return appName;
        };
    }
})();