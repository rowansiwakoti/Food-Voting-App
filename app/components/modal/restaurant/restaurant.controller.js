(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantController", RestaurantController);

    RestaurantController.$inject = ["$uibModalInstance", "RestaurantService", "$state", "APP"];

    function RestaurantController($uibModalInstance, RestaurantService, $state, APP) {
        var vm = this;

        vm.ok = function (restaurant) {

            RestaurantService.setRestaurant(restaurant);
            RestaurantService.setAlertMessage(restaurant.name + " " + APP.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();