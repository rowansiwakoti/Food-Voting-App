(function () {
    "use strict";
    angular.module("foodVotingApp")
        .controller("FooterController", FooterController);
    FooterController.$inject = ["APP"];

    function FooterController(APP) {
        var vm = this;
        vm.appName = APP.APP_NAME;
    }
})();