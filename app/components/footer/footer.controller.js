(function(){
    "use strict";
    angular.module("foodVotingApp")
        .controller("FooterController", FooterController);

    function FooterController(){
      var vm = this;
        vm.appName = "Food Voting App";
    }
})();