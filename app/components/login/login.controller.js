(function () {

    "use strict";

    angular.module("foodVotingApp")

        .controller("LoginController", LoginController);

    LoginController.$inject = ["commonService", "$state", "$sessionStorage"];

    function LoginController(commonService, $state, $sessionStorage) {
        var vm = this;
        vm.appName = "Food Voting App";
        vm.pageName = "User Login";

        vm.user = {};

        vm.validateUser = function (user) {
            var users = commonService.validateUser(user);

            if (users.length > 0) {
                $sessionStorage.role = users[0].role;
                $sessionStorage.username = users[0].username;
                console.log($sessionStorage.role);
                $state.go("dashboard");
            }
            else {
                vm.errorMessage = "Incorrect Username Or Password!";
            }
        };

    };

})();