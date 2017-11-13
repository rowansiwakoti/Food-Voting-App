(function () {
    "use strict";
    angular.module("foodVotingApp")
        .controller("EditFoodController", EditFoodController);

    EditFoodController.$inject = ["$uibModalInstance", "restaurantService", "foodService", "food", "$sessionStorage"];

    function EditFoodController($uibModalInstance, restaurantService, foodService, food, $sessionStorage) {

        var vm = this;

        vm.food = food;
        vm.restaurant = restaurantService.getRestaurantList();
        vm.user = $sessionStorage.username;

        vm.foodDuplicate = angular.copy(vm.food);
        vm.restaurantDuplicate = angular.copy(vm.restaurant);

        vm.ok = function (food) {

            var res = vm.restaurantDuplicate.filter(function (restaurant) {
                return restaurant.name === food.restaurant;
            });

            console.log(res[0].contact);

            var response = {
                id: food.id,
                name: food.name,
                restaurant: food.restaurant,
                price: food.price,
                contact: res[0].contact,
                vote: food.vote
            };

            foodService.setAlertMessage(food.name + " has been edited!");
            $uibModalInstance.close(response);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.deleteFood = function (food) {

            if (confirm("Are you sure want to delete it?")) {

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
                        foodService.setAlertMessage(food.name + " has been deleted!");
                    }
                    return foodService.getFoodList();
                });

                $uibModalInstance.dismiss('cancel');
            }
        };
    };
})();