(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("LogoutController", LogoutController);
    LogoutController.$inject = ["$uibModalInstance", "$sessionStorage", "$state", "APP_CONSTANT"];

    function LogoutController($uibModalInstance, $sessionStorage, $state, APP_CONSTANT) {

        var vm = this;

        vm.logoutMsg = APP_CONSTANT.LOGOUT_MSG;


        vm.ok = function () {
            $sessionStorage.username = "";
            $uibModalInstance.close();
            $state.go("login");
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();