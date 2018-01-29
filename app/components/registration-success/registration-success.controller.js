(
    function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('RegistrationSuccessController', RegistrationSuccessController);

        RegistrationSuccessController.$inject = [
            '$state'
        ];

        function RegistrationSuccessController($state) {

            var vm = this;

            vm.gotoLogin = gotoLogin;

            function gotoLogin() {
                $state.go('login');
            }
        }
    }
)();