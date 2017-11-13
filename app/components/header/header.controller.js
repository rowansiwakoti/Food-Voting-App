(function(){
    "use strict";
    angular.module("foodVotingApp")
        .controller("HeaderController", HeaderController);
    function HeaderController(){
        var vm = this;
        vm.appName = "Food Voting App";
    }
})();