(function () {

    "use strict";

    angular.module("foodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["commonService", "$location", "$scope", "$state"];

    function DashboardController(commonService, $location, $scope, $state) {
        var vm = this;
        vm.title = "Dashboard";
        vm.greet = "Welcome, " + commonService.getUserName() + "!";

        $scope.$on("$locationChangeStart", function (event) {
            event.preventDefault();
        });

        vm.userLogout = function () {
            if (confirm("Are you sure want to log out?")) {
                commonService.setUserName("");
                $state.go("login");
            }
        };
    }

})();