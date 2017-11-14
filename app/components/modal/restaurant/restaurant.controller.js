(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantController", RestaurantController);

    RestaurantController.$inject = ["$uibModalInstance", "restaurantService", "$state", "APP"];

    function RestaurantController($uibModalInstance, restaurantService, $state, APP) {
        var vm = this;

        vm.ok = function (restaurant) {

            restaurantService.setRestaurant(restaurant);
            restaurantService.setAlertMessage(restaurant.name + " " + APP.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();