(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$uibModalInstance", "FoodService", "RestaurantService", "APP"];

    function FoodController($uibModalInstance, FoodService, RestaurantService, APP) {
        var vm = this;


        vm.restaurants = RestaurantService.getRestaurantList();
        vm.ok = function (food) {
            food.vote = 0;
            FoodService.setFood(food);
            FoodService.setAlertMessage(food.name + " " + APP.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();