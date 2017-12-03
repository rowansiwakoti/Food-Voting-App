(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("EditFoodController", EditFoodController);

    EditFoodController.$inject = ["$uibModal", "$uibModalInstance", "FoodService", "food", "$sessionStorage", "$log",'$scope'];

    function EditFoodController($uibModal, $uibModalInstance,  FoodService, food, $sessionStorage, $log,$scope) {

        var vm = this;
        vm.food = food;
        vm.foodDuplicate = angular.copy(vm.food);

        vm.ok = function (food) {
            var response = FoodService.editFood(food);
            $uibModalInstance.close(response);
        };
        vm.cancel = function () {
            vm.message = "";
            $uibModalInstance.dismiss();
        };

        vm.deleteFood = function (food) {
            $uibModalInstance.dismiss();

            var modalInstance = $uibModal.open({
                ariaLabelledBy: "modal-title",
                animation: true,
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
                $log.info("Food delete confirm modal closed on " + new Date());
            }, function () {
                $log.info("Food delete confirm modal dismissed on " + new Date());
            });
        };
    };
})();

// vm.restaurantDuplicate = angular.copy(vm.restaurant);
// vm.restaurant = RestaurantService.getRestaurantList();
// vm.user = $sessionStorage.username;
// vm.foodNameReqMsg = APP_CONSTANT.FOOD_NAME_REQ_MSG;
// vm.foodPriceReqMsg = APP_CONSTANT.FOOD_PRICE_REQ_MSG;
// vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;


// vm.cancel = function () {
//     vm.message = "";
//     $uibModalInstance.dismiss();
// };