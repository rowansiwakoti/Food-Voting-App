(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('RestaurantModalController', RestaurantModalController);

    RestaurantModalController.$inject = ['$uibModalInstance', '$log', 'RestaurantService', 'APP_CONSTANT', 'delRestaurant', 'editRestaurant'];

    function RestaurantModalController($uibModalInstance, $log, RestaurantService, APP_CONSTANT, delRestaurant, editRestaurant) {
        var vm = this;

        vm.restaurant = {};
        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.contactNoMsg = APP_CONSTANT.CONTACT_NO_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;


        init();

        function init() {
            if (editRestaurant) {
                vm.restaurant = angular.copy(editRestaurant);
                vm.copyRestaurant = angular.copy(editRestaurant);
            }

            if (delRestaurant) {
                vm.restaurantToBeDeleted = delRestaurant.name;
            }
        }

        vm.addRestaurant = function (restaurant) {
            RestaurantService.addRestaurant(restaurant)
                .then(
                    function (answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
            RestaurantService.setAlertMessage(restaurant.name + ' ' + APP_CONSTANT.ADD_MSG);
        };

        vm.editRestaurant = function (restaurant) {
            RestaurantService.editRestaurant(restaurant)
                .then(
                    function (answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
            RestaurantService.setAlertMessage(restaurant.name + ' ' + APP_CONSTANT.EDIT_MSG);
        };

        vm.deleteRestaurant = function () {
            RestaurantService.deleteRestaurant(delRestaurant)
                .then(
                    function (answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        $log.info(error);
                    }
                );
            RestaurantService.setAlertMessage(delRestaurant.name + ' ' + APP_CONSTANT.DELETE_MSG);
        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();