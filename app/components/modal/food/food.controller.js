(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$uibModalInstance", "foodService", "restaurantService", "APP"];

    function FoodController($uibModalInstance, foodService, restaurantService, APP) {
        var vm = this;


        vm.restaurants = restaurantService.getRestaurantList();
        vm.ok = function (food) {
            food.vote = 0;
            foodService.setFood(food);
            foodService.setAlertMessage(food.name + " " + APP.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();