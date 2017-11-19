(function () {

    "use strict";
    angular.module("FoodVotingApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["UserService", "$state", "$sessionStorage", "APP_CONSTANT"];

    function LoginController(UserService, $state, $sessionStorage, APP_CONSTANT) {

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

            if (users.length > 0) {
                $sessionStorage.role = users[0].role;
                $sessionStorage.username = users[0].username;
                $state.go("dashboard");
            }
            else {
                vm.errorMessage = APP_CONSTANT.INCORRECT_USER_PASSWORD;
            }
        };
    };
})();