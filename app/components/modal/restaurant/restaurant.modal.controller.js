(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('RestaurantModalController', RestaurantModalController);

    RestaurantModalController.$inject = [
        '$uibModalInstance',
        '$log',
        'RestaurantService',
        'APP_CONSTANT',
        'Restaurant'
    ];

    function RestaurantModalController($uibModalInstance, $log, RestaurantService, APP_CONSTANT, Restaurant) {

        var vm = this;

        vm.restaurant = {};

        vm.numbersOnly = APP_CONSTANT.NUMBERS_ONLY;
        vm.alphabetsOnly = APP_CONSTANT.ALPHABETS_ONLY;
        vm.restNameReq = APP_CONSTANT.REST_NAME_REQ;
        vm.restNameTooLong = APP_CONSTANT.REST_NAME_TOO_LONG;
        vm.restNameTooShort = APP_CONSTANT.REST_NAME_TOO_SHORT;
        vm.restAddressReq = APP_CONSTANT.REST_ADDRESS_REQ;
        vm.restAddressTooLong = APP_CONSTANT.REST_ADDRESS_TOO_LONG;
        vm.restAddressTooShort = APP_CONSTANT.REST_ADDRESS_TOO_SHORT;
        vm.contactNoReq = APP_CONSTANT.CONTACT_NO_REQ;
        vm.contactNoSize = APP_CONSTANT.CONTACT_NO_SIZE;

        vm.addRestaurant = addRestaurant;
        vm.editRestaurant = editRestaurant;
        vm.deleteRestaurant = deleteRestaurant;
        vm.closeModal = closeModal;


        vm.$onInit = function () {
            if (Restaurant) {
                vm.restaurant = angular.copy(Restaurant);
                vm.copyRestaurant = angular.copy(Restaurant);
                vm.restaurantToBeDeleted = Restaurant.name;
            }
        };

        function addRestaurant(restaurant) {
            RestaurantService.addRestaurant(restaurant)
                .then(
                    function (answer) {
                        RestaurantService.setAlertMessage(restaurant.name + ' ' + APP_CONSTANT.ADD_MSG);
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
        }

        function editRestaurant(restaurant) {
            RestaurantService.editRestaurant(restaurant)
                .then(
                    function (answer) {
                        RestaurantService.setAlertMessage(restaurant.name + ' ' + APP_CONSTANT.EDIT_MSG);
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
        }

        function deleteRestaurant() {
            RestaurantService.deleteRestaurant(Restaurant)
                .then(
                    function (answer) {
                        RestaurantService.setAlertMessage(Restaurant.name + ' ' + APP_CONSTANT.DELETE_MSG);
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
        }

        function closeModal() {
            $uibModalInstance.dismiss();
        }
    }
})();