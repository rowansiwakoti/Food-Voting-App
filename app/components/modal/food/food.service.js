(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("FoodService", FoodService);

    FoodService.$inject = ["RestaurantService", "$sessionStorage"];

    function FoodService(RestaurantService, $sessionStorage) {

        var foodSvc = {};
        var alertMessage = "";
        var foodList = [];
        if ($sessionStorage.foodList) {
            foodList = $sessionStorage.foodList;
        }

//Get Food List
        foodSvc.getFoodList = function () {
            return foodList;
        };

//Delete Food from the list
        foodSvc.deleteFood = function (delFood) {
            var position;
            foodList.forEach(function (food, index) {
                if (delFood.id == food.id) {
                    position = index;
                }
            })
            foodList.splice(position, 1);
            return foodList;
        }

//Edit Food
        foodSvc.editFood = function (newFood) {
            var position;
            foodList.forEach(function (food, index) {
                if (newFood.id == food.id) {
                    position = index;
                }
            })
            foodList[position] = newFood;
            $sessionStorage.foodList = foodList;
            return (foodSvc.foodList);
        }

//Get Food
        foodSvc.getFood = function (id) {
            var food = foodList.filter(function (food) {
                return food.id === id;
            });
            return food[0];
        };

//Add Food to the List
        foodSvc.addFood = function (food) {
            foodList.push({
                id: Math.floor(Math.random() * 100000),
                name: food.name,
                restaurant: food.restaurant,
                price: food.price
            });
            $sessionStorage.foodList = foodList;
            return foodList;
        };

//Set and Get Alert Messages
        foodSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        foodSvc.getAlertMessage = function () {
            return alertMessage;
        };
//Return food Service
        return foodSvc;
    }
})();
