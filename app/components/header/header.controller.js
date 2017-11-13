(function () {
    "use strict";
    angular.module("foodVotingApp")
        .controller("HeaderController", HeaderController);
    HeaderController.$inject = ["APP"];

    function HeaderController(APP) {
        var vm = this;
        vm.appName = APP.APP_NAME;
    }
})();