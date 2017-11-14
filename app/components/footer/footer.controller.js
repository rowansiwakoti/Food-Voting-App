(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FooterController", FooterController);
    FooterController.$inject = ["APP"];

    function FooterController(APP) {

        var vm = this;

        var appName = APP.APP_NAME;

        vm.getAppName = function () {
            return appName;
        }
    }
})();