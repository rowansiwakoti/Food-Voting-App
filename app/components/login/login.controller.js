(function () {

    "use strict";

    angular.module("foodVotingApp")

        .controller("LoginController", LoginController);

    LoginController.$inject = ["$location", "commonService"];

    function LoginController($location, commonService) {
        var vm = this;
        vm.appName = "Food Voting App";

        vm.user = {};

        vm.validateUser = function (user) {
            if (user.username == "rowans" && user.password == "rowansiwakoti") {
                commonService.setUserName(user.username);
                $location.path("/dashboard");
            }
            else {
                vm.errorMessage = "Incorrect Username or Password";
            }
        }

    };

})();