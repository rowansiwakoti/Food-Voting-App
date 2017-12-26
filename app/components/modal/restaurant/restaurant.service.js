(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("RestaurantService", RestaurantService);
    RestaurantService.$inject = ['$sessionStorage', 'FoodService','$http'];

    function RestaurantService($sessionStorage, FoodService,$http) {

        var restaurantSvc = {};
        var alertMessage = "";
        var restaurantList = [];

        //Add the restaurant
        restaurantSvc.addRestaurant = function (restaurant) {
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/restaurants',
                data: restaurant
            }
            return ($http(req));
        };

        //Delete the restaurant
        restaurantSvc.deleteRestaurant = function (restaurant) {
            FoodService.delteFromAddFoods(restaurant.id);
            return ($http.delete('http://localhost:8080/restaurants/'+restaurant.id));
        };

        //Edit the restaurant
        restaurantSvc.editRestaurant = function (restaurant) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/restaurants/'+restaurant.id,
                data: restaurant
            }
            return ($http(req));
        };

        //Get the list of restaurants
        restaurantSvc.getRestaurantList = function () {
             return ($http.get('http://localhost:8080/restaurants'));
        };

        restaurantSvc.setAlertMessage = function (msg) {
            console.log('set alert message');
            alertMessage = msg;
        };
        restaurantSvc.getAlertMessage = function () {
            return alertMessage;
        };
        return restaurantSvc;
    }
})();