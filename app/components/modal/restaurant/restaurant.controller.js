(function () {
    "use strict";
    angular.module("foodVotingApp")
        .controller("RestaurantController", RestaurantController);

    RestaurantController.$inject = ["$uibModalInstance", "restaurantService", "$state"];

    function RestaurantController($uibModalInstance, restaurantService, $state) {
        var vm = this;

        vm.ok = function (restaurant) {

            restaurantService.setRestaurant(restaurant);
            restaurantService.setAlertMessage(restaurant.name + " has been added!");
            console.log(restaurant.name + " has been added!");
            $uibModalInstance.close();
            // $state.go("dashboard");
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();