(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .component("fvFooter", {
            templateUrl: "components/footer/footer.html",
            controller: "FooterController as footer"
        });
})();