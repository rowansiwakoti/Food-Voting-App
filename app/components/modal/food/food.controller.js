(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$uibModalInstance","$scope", "$rootScope", "FoodService", "APP_CONSTANT", "addRestaurant", "editFood", "deleteFood",'restaurantId'];

    function FoodController($uibModalInstance,$scope, $rootScope, FoodService, APP_CONSTANT, addRestaurant, editFood, deleteFood,restaurantId) {
    var vm = this;

        vm.foodNameReqMsg = APP_CONSTANT.FOOD_NAME_REQ_MSG;
        vm.foodPriceReqMsg = APP_CONSTANT.FOOD_PRICE_REQ_MSG;
        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;
        vm.food = {};

        if (editFood) {
            vm.food = angular.copy(editFood);
            vm.copyFood = angular.copy(editFood);
        }

        if (deleteFood) {
            vm.foodToBeDeleted = deleteFood.name;
        }

        vm.addFood = function (food) {
            // food.restaurant = addRestaurant;
            var add  = FoodService.addFood(food,restaurantId);
            add.then(
                function(answer) {
                    console.log(answer.data)
                    // vm.foods = answer.data;
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            );
            FoodService.setAlertMessage(food.name + " " + APP_CONSTANT.ADD_MSG);
            $uibModalInstance.close(food);
        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.editFood = function (food) {
            var edit = FoodService.editFood(food);
            edit.then(
                function(answer) {
                    console.log(answer.data)
                    // vm.foods = answer.data;
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            )
            $uibModalInstance.close(food);
        };

        vm.deleteFood = function () {console.log('food to delete' , deleteFood)
            var del = FoodService.deleteFood(deleteFood);
            del.then(
                function(answer) {
                    console.log(answer.data)
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            )
            $uibModalInstance.close(deleteFood);
        };
    }
})();