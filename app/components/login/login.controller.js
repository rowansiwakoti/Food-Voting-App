(function () {

    "use strict";
    angular.module("FoodVotingApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["UserService", "$sessionStorage", "$state", "APP_CONSTANT"];

    function LoginController(UserService, $sessionStorage, $state, APP_CONSTANT) {

        var vm = this;

        var pageName = APP_CONSTANT.PAGE_NAME;
        vm.userInputLength = APP_CONSTANT.USER_INPUT_LENGTH;
        vm.userInputFormat = APP_CONSTANT.USER_INPUT_FORMAT;

        vm.user = {};
        vm.getPageName = function () {
            return pageName;
        };

        vm.validateUser = function (user) {
            var users = UserService.validateUser(user);

            console.log(users);
            console.log(users.length);

            if (users.length > 0) {
                $sessionStorage.emailId = users[0].emailId;
                console.log(users[0].role);
                $state.go("dashboard");
            }
            else {
                vm.errorMessage = APP_CONSTANT.INCORRECT_USER_PASSWORD;
            }
        };

        vm.userRegister = function () {
            $state.go("register");
        };
    };
})();