(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("FoodService", FoodService);

    FoodService.$inject = ["RestaurantService","$sessionStorage"];

    function FoodService(RestaurantService,$sessionStorage) {

        var foodSvc = {};
        var alertMessage = "";
        if($sessionStorage.foodList){
            var foodList = $sessionStorage.foodList;
        }
        else {
            var foodList =[];
        }

        foodSvc.setFood = function (food) {

            var rest = RestaurantService.getRestaurantList().filter(function (restaurant) {
                return restaurant.name === food.restaurant;
            });

            if (foodList.length > 0) {
                var flag = foodList.length;

                foodList.push({
                    id: flag + 1,
                    name: food.name,
                    restaurant: food.restaurant,
                    price: food.price,
                    contact: rest[0].contact,
                    vote: food.vote
                });
            }
            else {
                foodList.push({
                    id: 1,
                    name: food.name,
                    restaurant: food.restaurant,
                    price: food.price,
                    contact: rest[0].contact,
                    vote: food.vote
                });
            }
            $sessionStorage.foodList =  foodList;
        };
        foodSvc.getFoodList = function () {
            return foodList;
        };

        foodSvc.getFood = function (id) {
            var food = foodList.filter(function (food) {
                return food.id === id;
            });
            return food[0]
        };

        foodSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        foodSvc.getAlertMessage = function () {
            return alertMessage;
        };
        return foodSvc;
    }
})();