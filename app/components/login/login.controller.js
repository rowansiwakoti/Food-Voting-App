(function () {

    "use strict";
    angular.module("FoodVotingApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$rootScope", "UserService", "$state", "$sessionStorage", "APP_CONSTANT",'$location'];

    function LoginController($rootScope, UserService, $state, $sessionStorage, APP_CONSTANT, $location) {

        var vm = this;

        var pageName = APP_CONSTANT.PAGE_NAME;
        vm.userInputLength = APP_CONSTANT.USER_INPUT_LENGTH;
        vm.userInputFormat = APP_CONSTANT.USER_INPUT_FORMAT;
        vm.register = false;
        vm.registerActive = '';
        vm.loginActive = 'active'
        vm.user = {};
        vm.getPageName = function () {
            return pageName;
        };

        vm.validateUser = function (user) {
            UserService.validateUser(user)
                .then(
                    function (message) {
                        $sessionStorage.role = message.data.userRole;
                        $rootScope.$broadcast("instantUpdateRole", $sessionStorage.role);
                        $sessionStorage.balance = message.data.balance;
                        $rootScope.$broadcast("instantUpdateBalance", $sessionStorage.balance);
                        // $sessionStorage.emailId = message.data.firstName;
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