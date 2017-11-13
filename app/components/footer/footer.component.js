(function () {
    "use strict";
    angular.module("foodVotingApp")
        .component("fvFooter", {
            templateUrl: "components/footer/footer.html",
            controller: "FooterController as footer"
        });
})();