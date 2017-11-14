(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("DeleteFoodController", DeleteFoodController);
    DeleteFoodController.$inject = ["$uibModalInstance", "FoodService", "foodParam", "APP"];

    function DeleteFoodController($uibModalInstance, FoodService, foodParam, APP) {
        var vm = this;
        vm.ok = function () {

            var food = foodParam;

            var res = FoodService.getFoodList().filter(function (foodl) {
                return foodl.restaurant === food.restaurant;
            });

            FoodService.getFoodList().filter(function (food2) {
                if (food2.id === food.id) {
                    FoodService.getFoodList().splice({
                        name: food.name,
                        restaurant: food.restaurant,
                        price: food.price,
                        contact: res[0].contact,
                        vote: food.vote
                    }, 1);

                    FoodService.setAlertMessage(food.name + " " + APP.DELETE_MSG);
                }
                return FoodService.getFoodList();
            });

            $uibModalInstance.close();

        };
        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();