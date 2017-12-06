(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$scope", "$rootScope", "$uibModalInstance", "FoodService", "APP_CONSTANT", "addRestaurant", "editFood", "deleteFood"];

    function FoodController($scope, $rootScope, $uibModalInstance, FoodService, APP_CONSTANT, addRestaurant, editFood, deleteFood) {
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
            food.restaurant = addRestaurant;
            FoodService.addFood(food);
            FoodService.setAlertMessage(food.name + " " + APP_CONSTANT.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.editFood = function (food) {
            FoodService.editFood(food);
            $uibModalInstance.close();
        };

        vm.deleteFood = function () {
            FoodService.deleteFood(deleteFood);
            $scope.$watch(function () {
                return FoodService.getFoodList();
            }, function (updatedFoodList) {
                $rootScope.$broadcast("updateFoodList", updatedFoodList);
            });
            $uibModalInstance.close();
        };
    }
})();