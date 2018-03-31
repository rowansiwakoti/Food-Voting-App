(function () {

    'use strict';
    angular.module('FoodOrderingApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        '$sessionStorage',
        'APP_CONSTANT',
        'UserService'
    ];

    function LoginController($scope, $rootScope, $state, $sessionStorage, APP_CONSTANT, UserService) {

        var vm = this;

        vm.user = {};
        vm.inputType = 'password';
        vm.dataLoading = false;
        vm.validateUser = validateUser;

        function validateUser(user) {
            vm.dataLoading = true;
            UserService.validateUser(user)
                .then(
                    function (answer) {
                        if (answer.data) {
                            saveDataToSession(answer.data);
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
        }

        function saveDataToSession(data) {console.log(data);
            $sessionStorage.userId = data.userId;
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