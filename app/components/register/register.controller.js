(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', '$log', 'UserService', 'APP_CONSTANT'];

    function RegisterController($state, $log, UserService, APP_CONSTANT) {

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

        vm.backToLogin = function () {
            $state.go('login');
        };

        vm.registerUser = function (user) {
            console.log(' I am here');
            if (user.userPassword === user.confirmPassword) {
                UserService.setUser(user)
                    .then(
                        function (answer) {
                            $log.info(answer);
                        },
                        function (error) {
                            $log.info(error);
                        },
                        function (progress) {
                            $log.info(progress);
                        }
                    )
                $state.go('login');
            }
            else {
                alert('Password and confirm password did not match!');
            }
        };
    }
})();