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

        vm.userRegister = function () {
            $state.go("register");
        };

        vm.validateUser = function (user) {
            console.log(user);
            var login = UserService.validateUser(user);
            login.then(
                function (message) {
                    console.log(message.data);
                    $sessionStorage.role = message.data.userRole;
                    $sessionStorage.emailId = message.data.firstName;
                    $state.go('dashboard');
                },
                function (error) {
                    console.log(error);
                },
                function (progress) {
                    console.log(progress);
                }
            );
            //
            // if (users.length > 0 ) {       console.log(users[0])
            //     $sessionStorage.emailId = users[0].emailId;
            //     $sessionStorage.role = users[0].role;
            //     $state.go('dashboard');
            // }
            // else {
            //     vm.errorMessage = APP_CONSTANT.INCORRECT_USER_PASSWORD;
            // }
        };
    }
})();