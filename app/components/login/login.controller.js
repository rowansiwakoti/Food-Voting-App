(function () {

    'use strict';
    angular.module('FoodOrderingApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', 'UserService', '$state', '$sessionStorage', 'APP_CONSTANT'];

    function LoginController($rootScope, UserService, $state, $sessionStorage, APP_CONSTANT) {

        var vm = this;

        var pageName = APP_CONSTANT.PAGE_NAME;
        vm.userInputLength = APP_CONSTANT.USER_INPUT_LENGTH;
        vm.userInputFormat = APP_CONSTANT.USER_INPUT_FORMAT;
        vm.register = false;
        vm.registerActive = '';
        vm.loginActive = 'active'
        vm.user = {};
        vm.inputType = 'password';

        vm.getPageName = function () {
            return pageName;
        };

        vm.validateUser = function (user) {
            UserService.validateUser(user)
                .then(
                    function (message) {
                        $sessionStorage.userId = message.data.id;
                        $sessionStorage.firstName = message.data.firstName;
                        $sessionStorage.middleName = message.data.middleName;
                        $sessionStorage.lastName = message.data.lastName;
                        $sessionStorage.contact = message.data.contact;
                        $sessionStorage.address = message.data.address;
                        $sessionStorage.role = message.data.role;
                        $sessionStorage.emailId = message.data.email;
                        $sessionStorage.balance = message.data.balance;
                        $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
                        $rootScope.$broadcast('instantUpdateRole', $sessionStorage.role);
                        $state.go('dashboard');
                    },
                    function (error) {
                        console.log(error);
                    },
                    function (progress) {
                        console.log(progress);
                    }
                );
        };
    }
})();