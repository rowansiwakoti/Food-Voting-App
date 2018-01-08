(function () {

    'use strict';
    angular.module('FoodOrderingApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$sessionStorage', '$timeout', '$log', 'APP_CONSTANT', 'UserService'];

    function LoginController($rootScope, $state, $sessionStorage, $timeout, $log, APP_CONSTANT, UserService) {

        var vm = this;

        var pageName = APP_CONSTANT.PAGE_NAME;
        vm.userInputLength = APP_CONSTANT.USER_INPUT_LENGTH;
        vm.userInputFormat = APP_CONSTANT.USER_INPUT_FORMAT;
        vm.user = {};
        vm.inputType = 'password';
        vm.dataLoading = false;


        vm.getPageName = function () {
            return pageName;
        };

        vm.validateUser = function (user) {
            vm.dataLoading = true;
            $timeout(function () {
                UserService.validateUser(user)
                    .then(
                        function (message) {
                            saveDataToSession(message);
                            $state.go('dashboard');
                        },
                        function (error) {
                            $log.info(error);
                        }
                    );
            }, 2000);
        };

        function saveDataToSession(message) {
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
        }
    }
})();