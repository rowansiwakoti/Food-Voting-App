(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("RestaurantService", RestaurantService);
    RestaurantService.$inject=['$sessionStorage'];
    function RestaurantService($sessionStorage) {

        var restaurantSvc = {};
        var alertMessage = "";
        if($sessionStorage.restaurantList){
            var restaurantList = $sessionStorage.restaurantList;
        }
        else {
            var restaurantList = [];
        }

        restaurantSvc.setRestaurant = function (restaurant) {
            if (restaurantList.length > 0) {
                var flag = restaurantList.length;
                restaurantList.push({
                    id: flag + 1,
                    name: restaurant.name,
                    contact: restaurant.contactNo
                });
            }
            else {
                restaurantList.push({
                    id: 1,
                    name: restaurant.name,
                    contact: restaurant.contactNo
                });
            }
         ($sessionStorage.restaurantList=restaurantList);
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