(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('RestaurantService', RestaurantService);
    RestaurantService.$inject = ['$http', 'FoodService', 'APP_CONSTANT'];

    function RestaurantService($http, FoodService, APP_CONSTANT) {

        var restaurantSvc = {};
        var alertMessage = '';
        var appUrl = APP_CONSTANT.FOA_APP;

        //Add the restaurant
        restaurantSvc.addRestaurant = function (restaurant) {
            restaurant.active = true;
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: appUrl + '/restaurants',
                data: restaurant
            }
            return ($http(req));
        };

        //Delete the restaurant
        restaurantSvc.deleteRestaurant = function (restaurant) {
            console.log(restaurant);
            FoodService.delteFromAddFoods(restaurant.id);
            return ($http.delete(appUrl + '/restaurants/' + restaurant.id));
        };

        //Edit the restaurant
        restaurantSvc.editRestaurant = function (restaurant) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: appUrl + '/restaurants/' + restaurant.id,
                data: restaurant
            }
            return ($http(req));
        };

        //Get the list of restaurants
        restaurantSvc.getRestaurantList = function () {
            return ($http.get(appUrl + '/restaurants'));
        };

        restaurantSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        restaurantSvc.getAlertMessage = function () {
            return alertMessage;
        };

        restaurantSvc.activateRestaurant = function (id) {
            return $http.get(appUrl + '/restaurants/' + id + '/activate');
        };

        restaurantSvc.deactivateRestaurant = function (id) {
            return $http.get(appUrl + '/restaurants/' + id + '/deactivate');
        };
        return restaurantSvc;
    }
})();