(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .component("fvHeader", {
            templateUrl: "components/header/header.html",
            controller: "HeaderController as header"
        });
})();