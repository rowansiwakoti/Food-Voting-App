(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .controller("LoginController", LoginController);

    LoginController.$inject = ["CommonService", "$state", "$sessionStorage", "APP"];

    function LoginController(CommonService, $state, $sessionStorage, APP) {
        var vm = this;

        var pageName = APP.PAGE_NAME;

        vm.user = {};

        vm.getPageName = function () {
            return pageName;
        };

        vm.validateUser = function (user) {
            var users = CommonService.validateUser(user);

            if (users.length > 0) {
                $sessionStorage.role = users[0].role;
                $sessionStorage.username = users[0].username;
                $state.go("dashboard");
            }
            else {
                vm.errorMessage = APP.INCORRECT_USER_PASSWORD;
            }
        };

    };

})();