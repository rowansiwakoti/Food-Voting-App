(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', '$log', '$timeout', 'UserService', 'APP_CONSTANT'];

    function RegisterController($state, $log, $timeout, UserService, APP_CONSTANT) {

        var vm = this;

        vm.firstNameMsg = APP_CONSTANT.FIRST_NAME_MSG;
        vm.lastNameMsg = APP_CONSTANT.LAST_NAME_MSG;
        vm.emailMsg = APP_CONSTANT.EMAIL_MSG;
        vm.invalidEmailMsg = APP_CONSTANT.INVALID_EMAIL_MSG;
        vm.contactNumMsg = APP_CONSTANT.CONTACT_NO_MSG;
        vm.addressMsg = APP_CONSTANT.ADDRESS_MSG;
        vm.passwordMsg = APP_CONSTANT.PASSWORD_MSG;
        vm.confirmPasswordMsg = APP_CONSTANT.CONFIRM_PASSWORD_MSG;

        vm.user = {};
        vm.dataLoading = false;
        vm.errorStatus = false;

        vm.backToLogin = function () {
            $state.go('login');
        };

        vm.registerUser = function (user) {
            vm.dataLoading = true;
            $timeout(function () {
                if (user.userPassword === user.confirmPassword) {
                    UserService.setUser(user)
                        .then(
                            function (answer) {
                                $state.go('gotologin');
                                $log.info(answer);
                            },
                            function (error) {
                                $state.go('login');
                                $log.info(error);
                            }
                        );
                }
                else {
                    alert('Password and confirm password did not match!');
                }
            }, 1000);

        };
    }
})();