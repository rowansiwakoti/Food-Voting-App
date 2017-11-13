(function () {
    "use strict";
    angular.module("foodVotingApp")
        .component("fvHeader", {
            templateUrl: "components/header/header.html",
            controller: "HeaderController as header"
        });
})();