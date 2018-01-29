(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('FooterController', FooterController);
    FooterController.$inject = [
        'APP_CONSTANT'
    ];

    function FooterController(APP_CONSTANT) {

        var vm = this;

        vm.appName = appName;

        function appName() {
            return APP_CONSTANT.APP_NAME;
        }
    }
})();