(function () {

    "use strict";

    angular.module("foodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["commonService", "$scope", "$state", "APP"];

    function DashboardController(commonService, $scope, $state, APP) {
        var vm = this;

        vm.appName = APP.APP_NAME;
        vm.title = APP.PAGE_TITLE;
        vm.userName = commonService.getUserName();

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