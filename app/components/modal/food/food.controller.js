(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("FoodController", FoodController);

    FoodController.$inject = ["$uibModalInstance", "FoodService", "RestaurantService", "APP_CONSTANT","$stateParams","$sessionStorage","restaurant"];

    function FoodController($uibModalInstance, FoodService, RestaurantService, APP_CONSTANT,$stateParams,$sessionStorage,restaurant) {
        var vm = this;

        vm.foodNameReqMsg = APP_CONSTANT.FOOD_NAME_REQ_MSG;
        vm.foodPriceReqMsg = APP_CONSTANT.FOOD_PRICE_REQ_MSG;
        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;
        vm.food={};

        vm.ok = function (food) {
            food.restaurant = restaurant;
            FoodService.addFood(food);
            FoodService.setAlertMessage(food.name + " " + APP_CONSTANT.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();