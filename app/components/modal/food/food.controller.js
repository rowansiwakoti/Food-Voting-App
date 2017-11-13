(function () {
    "use strict";
    angular.module("foodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$uibModalInstance", "foodService", "restaurantService"];

    function FoodController($uibModalInstance, foodService, restaurantService) {
        var vm = this;


        vm.restaurants = restaurantService.getRestaurantList();
        vm.ok = function (food) {
            food.vote = 0;
            foodService.setFood(food);
            foodService.setAlertMessage(food.name + " has been added!");
            console.log(food.name + " has been added!");
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();