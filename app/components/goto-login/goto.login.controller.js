(
    function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('GotoLoginController', GotoLoginController);

        GotoLoginController.$inject = ['$state'];

        function GotoLoginController($state) {
            var vm = this;

            vm.gotoLogin = function () {
                $state.go('login');
            };
        }
    }
)();