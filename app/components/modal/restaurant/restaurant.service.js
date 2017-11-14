(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService() {
        var restaurantSvc = {};

        var alertMessage = "";
        var restaurantList = [];

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
        }

        restaurantSvc.getRestaurantList = function () {
            return restaurantList;
        }

        restaurantSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        }
        restaurantSvc.getAlertMessage = function () {
            return alertMessage;
        }
        return restaurantSvc;
    }
})();