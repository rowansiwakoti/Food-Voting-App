(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('FoodController', FoodController);

    FoodController.$inject = [
        '$uibModalInstance',
        'FoodService',
        'APP_CONSTANT',
        'food',
        'foods'
    ];

    function FoodController($uibModalInstance, FoodService, APP_CONSTANT, food, foods) {

        var vm = this;

        vm.foodNameReq = APP_CONSTANT.FOOD_NAME_REQ;
        vm.foodNameTooLong = APP_CONSTANT.FOOD_NAME_TOO_LONG;
        vm.foodNameTooShort = APP_CONSTANT.FOOD_NAME_TOO_SHORT;
        vm.foodPriceReq = APP_CONSTANT.FOOD_PRICE_REQ;
        vm.foodPriceLow = APP_CONSTANT.FOOD_PRICE_LOW;
        vm.foodPriceHigh = APP_CONSTANT.FOOD_PRICE_HIGH;
        vm.numbersOnly = APP_CONSTANT.NUMBERS_ONLY;
        vm.alphabetsOnly = APP_CONSTANT.ALPHABETS_ONLY;

        vm.food = {};

        vm.addFood = addFood;
        vm.addFoodConfirm = addFoodConfirm;
        vm.closeModal = closeModal;
        vm.editFood = editFood;
        vm.deleteFood = deleteFood;


        vm.$onInit = function () {
            if (food) {
                vm.food = angular.copy(food);
                vm.copyFood = angular.copy(food);
                vm.foodToBeDeleted = food.name;
            }
        }

        function addFood(food) {
            $uibModalInstance.close(food);
        }


        function addFoodConfirm() {
            var foodList = foods;
            FoodService.addFoods(foodList).then(
                function (answer) {
                    $uibModalInstance.close(answer.data);
                },
                function (error) {
                }
            );
        }

        function closeModal() {
            $uibModalInstance.dismiss();
        }

        function editFood(food) {
            FoodService.editFood(food)
                .then(angular.noop, angular.noop);
            $uibModalInstance.close(food);
        }

        function deleteFood() {
            FoodService.deleteFood(food)
                .then(angular.noop, angular.noop);
            $uibModalInstance.close(food);
        }
    }
})();