(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("HeaderController", HeaderController);
    HeaderController.$inject = ["APP"];

    function HeaderController(APP) {

        var vm = this;

        var appName = APP.APP_NAME;

        vm.getAppName = function(){
            return appName;
        }
    }
})();