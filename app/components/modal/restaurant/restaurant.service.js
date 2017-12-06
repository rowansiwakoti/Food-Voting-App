(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("RestaurantService", RestaurantService);
    RestaurantService.$inject = ['$sessionStorage', 'FoodService'];

    function RestaurantService($sessionStorage, FoodService) {

        var restaurantSvc = {};
        var alertMessage = "";
        var restaurantList = [];
        if ($sessionStorage.restaurantList) {
            restaurantList = $sessionStorage.restaurantList;
        }
        else {
            restaurantList = [];
        }

        restaurantSvc.addRestaurant = function (restaurant) {
            restaurantList.push({
                id: Math.floor(Math.random() * 10000),
                name: restaurant.name,
                contact: restaurant.contact
            });
            ($sessionStorage.restaurantList = restaurantList);
        };

        restaurantSvc.deleteRestaurant = function (restaurant) {
            restaurantList.forEach(function (restaurantParam) {
                if (restaurantParam.id === restaurant.id) {
                    restaurantList.splice(restaurantList.indexOf(restaurantParam), 1);
                    FoodService.getFoodList().forEach(function (food) {
                        if (food.restaurant === restaurant.name) {
                            FoodService.getFoodList().splice(FoodService.getFoodList().indexOf(food));
                        }
                    });
                }
            });
        };

        restaurantSvc.editRestaurant = function (restaurant) {
            var position = null;
            restaurantList.forEach(function (eachRestaurant, index) {
                if (restaurant.id === eachRestaurant.id) {
                    position = index;
                }
            });
            restaurantList[position] = restaurant;
            $sessionStorage.restaurantList = restaurantList;
            return restaurantSvc.restaurantList;
        };

        restaurantSvc.getRestaurantList = function () {
            return restaurantList;
        };

        restaurantSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        restaurantSvc.getAlertMessage = function () {
            return alertMessage;
        };
        return restaurantSvc;
    }
})();