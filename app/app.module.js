(function () {
    "use strict";

    angular.module("FoodVotingApp", ["ui.router", "ui.bootstrap", "ngStorage"])
        .run(["$rootScope", function ($rootScope) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, option) {
                // event.preventDefault();
               console.log("hello world");
               alert("success!");
            });

            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                console.log("in $stateChangeSuccess");
            });
        }]);

})();

