(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('RestaurantService', RestaurantService);
    RestaurantService.$inject = [
        '$http',
        'FoodService',
        'APP_CONSTANT'
    ];

    function RestaurantService($http, FoodService, APP_CONSTANT) {

        var alertMessage = '';
        var appUrl = APP_CONSTANT.FOA_APP;

        var restaurantSvc = {
            addRestaurant: addRestaurant,
            deleteRestaurant: deleteRestaurant,
            editRestaurant: editRestaurant,
            getRestaurantList: getRestaurantList,
            setAlertMessage: setAlertMessage,
            getAlertMessage: getAlertMessage,
            activateRestaurant: activateRestaurant,
            deactivateRestaurant: deactivateRestaurant

        };

        function addRestaurant(restaurant) {
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
        }

        function deleteRestaurant(restaurant) {
            FoodService.deleteFromAddFoods(restaurant.id);
            return ($http.delete(appUrl + '/restaurants/' + restaurant.id));
        }

        function editRestaurant(restaurant) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: appUrl + '/restaurants/' + restaurant.id,
                data: restaurant
            }
            return ($http(req));
        }

        function getRestaurantList(id) {
            return ($http.get(appUrl + '/restaurants/page/'+id+'/6'));
        }

        function setAlertMessage(msg) {
            alertMessage = msg;
        }

        function getAlertMessage() {
            return alertMessage;
        }

        function activateRestaurant(id) {
            return $http.get(appUrl + '/restaurants/' + id + '/activate');
        }

        function deactivateRestaurant(id) {
            return $http.get(appUrl + '/restaurants/' + id + '/deactivate');
        }



        return restaurantSvc;
    }
})();