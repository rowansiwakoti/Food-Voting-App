(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("DeleteFoodController", DeleteFoodController);
    DeleteFoodController.$inject = ["$uibModalInstance", "foodService", "foodParam", "APP"];

    function DeleteFoodController($uibModalInstance, foodService, foodParam, APP) {
        var vm = this;
        vm.ok = function () {

            var food = foodParam;

            var res = foodService.getFoodList().filter(function (foodl) {
                return foodl.restaurant === food.restaurant;
            });

            foodService.getFoodList().filter(function (food2) {
                if (food2.id === food.id) {
                    foodService.getFoodList().splice({
                        name: food.name,
                        restaurant: food.restaurant,
                        price: food.price,
                        contact: res[0].contact,
                        vote: food.vote
                    }, 1);
                    
                    foodService.setAlertMessage(food.name + " " + APP.DELETE_MSG);
                }
                return foodService.getFoodList();
            });

            $uibModalInstance.close();

        };
        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();