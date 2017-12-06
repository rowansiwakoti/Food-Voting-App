(function () {
    "use strict";

    angular.module("FoodVotingApp")
        .controller("RegisterController", RegisterController);

    RegisterController.$inject = ["$state", "UserService", "APP_CONSTANT", "$sessionStorage"];

    function RegisterController($state, UserService, APP_CONSTANT, $sessionStorage) {
        var vm = this;

        vm.firstNameMsg = APP_CONSTANT.FIRST_NAME_MSG;
        vm.lastNameMsg = APP_CONSTANT.LAST_NAME_MSG;
        vm.emailMsg = APP_CONSTANT.EMAIL_MSG;
        vm.invalidEmailMsg = APP_CONSTANT.INVALID_EMAIL_MSG;
        vm.contactNumMsg = APP_CONSTANT.CONTACT_NUM_MSG;
        vm.addressMsg = APP_CONSTANT.ADDRESS_MSG;
        vm.passwordMsg = APP_CONSTANT.PASSWORD_MSG;
        vm.confirmPasswordMsg = APP_CONSTANT.CONFIRM_PASSWORD_MSG;

        vm.user = {};

        vm.backToLogin = function () {
            $state.go("login");
        };

        vm.registerUser = function (user) {
            if (user.password == user.confirmPassword) {
                $sessionStorage.userList = user;
                UserService.setUser(user);
                $state.go("login");
            }
            else {
                alert("Password and confirm password did not match!");
            }
        };
    }
})();