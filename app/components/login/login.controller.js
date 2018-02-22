(function () {

    'use strict';
    angular.module('FoodOrderingApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$rootScope',
        '$state',
        '$sessionStorage',
        '$timeout',
        'APP_CONSTANT',
        'UserService'
    ];

    function LoginController($rootScope, $state, $sessionStorage, $timeout, APP_CONSTANT, UserService) {

        var vm = this;

        vm.user = {};
        vm.inputType = 'password';
        vm.dataLoading = false;
        vm.validateUser = validateUser;


        function validateUser(user) {
            vm.dataLoading = true;
            $timeout(function () {
                UserService.validateUser(user)
                    .then(
                        function (message) {
                            if (message.data) {
                                saveDataToSession(message.data);
                                $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
                                $rootScope.$broadcast('instantUpdateRole', $sessionStorage.role);
                                vm.dataLoading = false;
                                $state.go('dashboard');
                            }
                        },
                        function (error) {
                            vm.errorMsg = APP_CONSTANT.USERNAME_NOT_EXIST;
                            vm.dataLoading = false;
                        }
                    );
            }, 2000);

        }

        function saveDataToSession(data) {
            $sessionStorage.userId = data.id;
            $sessionStorage.firstName = data.firstName;
            $sessionStorage.middleName = data.middleName;
            $sessionStorage.lastName = data.lastName;
            $sessionStorage.contact = data.contactNo;
            $sessionStorage.address = data.address;
            $sessionStorage.role = data.userRole;
            $sessionStorage.emailId = data.email;
            $sessionStorage.balance = data.balance;
        }
    }
})();