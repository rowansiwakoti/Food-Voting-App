(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('FoodService', FoodService);

    FoodService.$inject = ['$sessionStorage', '$http', 'APP_CONSTANT'];

    function FoodService($sessionStorage, $http, APP_CONSTANT) {

        var foodSvc = {};
        var alertMessage = '';
        var foodList = [];
        var appUrl = APP_CONSTANT.FOA_APP;

        // Get Food List
        foodSvc.getFoodList = function (id) {
            return ($http.get(appUrl + '/restaurants/' + id + '/foods'));
        };

        //Delete Food from the list
        foodSvc.deleteFood = function (food) {
            return ($http.delete(appUrl + '/foods/' + food.id));
        };

        //Edit Food
        foodSvc.editFood = function (food) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: food,
                url: appUrl + '/foods/' + food.id
            }
            return ($http(req));
        };

        //Get Food
        foodSvc.getFood = function (id) {
            var food = foodList.filter(function (food) {
                return food.id === id;
            });
            return food[0];
        };

        //Add Food to the List
        foodSvc.addFoods = function (foods) {
            var foodList = [];
            foods.forEach(function (food) {
                foodList.push({
                    name: food.name,
                    price: food.price,
                    restaurantId: food.restaurantId
                });
            });

            var url = appUrl + '/foods';
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url,
                data: foodList
            }
            return ($http(req));
        };

        // Set and Get Alert Messages
        foodSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        foodSvc.getAlertMessage = function () {
            return alertMessage;
        };

        foodSvc.delteFromAddFoods = function (id) {
            var addFoods = $sessionStorage.addFoods;
            var tempFoods = [];
            if (addFoods) {
                addFoods.forEach(function (food) {
                    if (food.restaurantId !== id) {
                        tempFoods.push(food);
                    }
                });
            }
            $sessionStorage.addFoods = tempFoods;
        };

        // Return food service
        return foodSvc;
    }
})();