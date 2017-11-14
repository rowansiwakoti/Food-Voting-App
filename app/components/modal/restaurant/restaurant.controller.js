(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantController", RestaurantController);

    RestaurantController.$inject = ["$uibModalInstance", "restaurantService", "$state"];

    function RestaurantController($uibModalInstance, restaurantService, $state) {
        var vm = this;

        vm.ok = function (restaurant) {

            restaurantService.setRestaurant(restaurant);
            restaurantService.setAlertMessage(restaurant.name + " has been added!");
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();