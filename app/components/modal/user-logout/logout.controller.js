(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("LogoutController", LogoutController);
    LogoutController.$inject = ["$rootScope", "$uibModalInstance", "$sessionStorage", "$state", "APP_CONSTANT"];

    function LogoutController($rootScope, $uibModalInstance, $sessionStorage, $state, APP_CONSTANT) {

        var vm = this;

        vm.logoutMsg = APP_CONSTANT.LOGOUT_MSG;


        vm.ok = function () {
            $sessionStorage.emailId = '';
            $sessionStorage.orderList = [];
            $sessionStorage.order = [];
            $sessionStorage.role = '';
            $rootScope.$broadcast("clearRole", $sessionStorage.role);
            $uibModalInstance.close();
            $state.go("login");
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();