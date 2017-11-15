(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("EditFoodController", EditFoodController);

    EditFoodController.$inject = ["$uibModal", "$uibModalInstance", "RestaurantService", "FoodService", "food", "$sessionStorage", "$log", "APP_CONSTANT"];

    function EditFoodController($uibModal, $uibModalInstance, RestaurantService, FoodService, food, $sessionStorage, $log, APP_CONSTANT) {

        var vm = this;

        vm.food = food;
        vm.restaurant = RestaurantService.getRestaurantList();
        vm.user = $sessionStorage.username;

        vm.foodDuplicate = angular.copy(vm.food);
        vm.restaurantDuplicate = angular.copy(vm.restaurant);

        vm.foodNameReqMsg = APP_CONSTANT.FOOD_NAME_REQ_MSG;
        vm.foodPriceReqMsg = APP_CONSTANT.FOOD_PRICE_REQ_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;

        vm.ok = function (food) {

            var res = vm.restaurantDuplicate.filter(function (restaurant) {
                return restaurant.name === food.restaurant;
            });

            var response = {
                id: food.id,
                name: food.name,
                restaurant: food.restaurant,
                price: food.price,
                contact: res[0].contact,
                vote: food.vote
            };

            FoodService.setAlertMessage(food.name + " " + APP_CONSTANT.EDIT_MSG);
            $uibModalInstance.close(response);
        };

        vm.cancel = function () {
            vm.message = "";
            $uibModalInstance.dismiss();
        };

        vm.deleteFood = function (food) {

            $uibModalInstance.dismiss();

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/food/delete-food.html",
                controller: "DeleteFoodController",
                controllerAs: "deleteFoodCtrl",
                resolve: {
                    foodParam: function () {
                        return food;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info("Food delete confirm modal dismissed on " + new Date());
            });
        };
    };
})();