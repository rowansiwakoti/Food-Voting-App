(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('FoodController', FoodController);

    FoodController.$inject = ['$uibModalInstance', '$log', 'FoodService', 'APP_CONSTANT', 'editFood', 'deleteFood', 'foods'];

    function FoodController($uibModalInstance, $log, FoodService, APP_CONSTANT, editFood, deleteFood, foods) {

        var vm = this;

        vm.foodNameReqMsg = APP_CONSTANT.FOOD_NAME_REQ_MSG;
        vm.foodPriceReqMsg = APP_CONSTANT.FOOD_PRICE_REQ_MSG;
        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;
        vm.food = {};

        init();

        function init() {
            if (editFood) {
                vm.food = angular.copy(editFood);
                vm.copyFood = angular.copy(editFood);
            }

            if (deleteFood) {
                vm.foodToBeDeleted = deleteFood.name;
            }
        }


        vm.addFood = function (food) {
            $uibModalInstance.close(food);
        };


        vm.addFoodConfirm = function () {
            var foodList = foods;
            FoodService.addFoods(foodList).then(
                function (answer) {
                    $uibModalInstance.close(answer.data);
                },
                function (error) {
                    $log.info(error);
                }
            );
        };
        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.editFood = function (food) {
            FoodService.editFood(food)
                .then(
                    function (answer) {

                    },
                    function (error) {
                        $log.info(error);
                    }
                )
            $uibModalInstance.close(food);
        };

        vm.deleteFood = function () {
            FoodService.deleteFood(deleteFood)
                .then(
                    function (answer) {
                    },
                    function (error) {
                        $log.info(error);
                    }
                )
            $uibModalInstance.close(deleteFood);
        };
    }
})();