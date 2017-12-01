(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("HeaderController", HeaderController);
    HeaderController.$inject = ["APP_CONSTANT"];

    function HeaderController(APP_CONSTANT) {

        var vm = this;

        var appName = APP_CONSTANT.APP_NAME;

        vm.getAppName = function(){
            return appName;
        }
    }
})();