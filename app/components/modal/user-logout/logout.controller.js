(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("LogoutController", LogoutController);
    LogoutController.$inject = ["$uibModalInstance", "$sessionStorage", "$state"];

    function LogoutController($uibModalInstance, $sessionStorage, $state) {

        var vm = this;

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