(function () {

    "use strict";
    angular.module("FoodVotingApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$rootScope", "UserService", "$state", "$sessionStorage", "APP_CONSTANT"];

    function LoginController($rootScope, UserService, $state, $sessionStorage, APP_CONSTANT) {

        var vm = this;

        var pageName = APP_CONSTANT.PAGE_NAME;
        vm.userInputLength = APP_CONSTANT.USER_INPUT_LENGTH;
        vm.userInputFormat = APP_CONSTANT.USER_INPUT_FORMAT;

        vm.user = {};
        vm.getPageName = function () {
            return pageName;
        };

        vm.userRegister = function () {
            $state.go("register");
        };

        vm.validateUser = function (user) {
            UserService.validateUser(user)
                .then(
                    function (message) {
                        $sessionStorage.role = message.data.userRole;
                        $rootScope.$broadcast("instantUpdateRole", $sessionStorage.role);
                        $sessionStorage.emailId = message.data.email;
                        $sessionStorage.firstName = message.data.firstName;
                        $sessionStorage.userId = message.data.id;
                        $state.go('dashboard');
                        console.log(message.data);
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