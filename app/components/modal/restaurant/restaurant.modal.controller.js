(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantModalController", RestaurantModalController);

    RestaurantModalController.$inject = ["$uibModalInstance", "RestaurantService", "APP_CONSTANT", "delRestaurant", "editRestaurant"];

    function RestaurantModalController($uibModalInstance, RestaurantService, APP_CONSTANT, delRestaurant, editRestaurant) {
        var vm = this;

        vm.restaurant = {};

        if (editRestaurant) {
            vm.restaurant = angular.copy(editRestaurant);
            vm.copyRestaurant = angular.copy(editRestaurant);
        }

        if (delRestaurant) {
            vm.restaurantToBeDeleted = delRestaurant.name;
        }

        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.contactNoMsg = APP_CONSTANT.CONTACT_NO_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;

        vm.addRestaurant = function (restaurant) {
            RestaurantService.addRestaurant(restaurant)
                .then(
                    function (answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        console.log(error);
                    },
                    function (progress) {
                        console.log(progress);
                    }
                );
            RestaurantService.setAlertMessage(restaurant.name + " " + APP_CONSTANT.ADD_MSG);

        };

        vm.editRestaurant = function (restaurant) {
            RestaurantService.editRestaurant(restaurant)
                .then(
                    function (answer) {

                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        console.log(error);
                    },
                    function (progress) {
                        console.log(progress);
                    }
                );
        };

        vm.deleteRestaurant = function () {
            RestaurantService.deleteRestaurant(delRestaurant)
                .then(
                    function (answer) {

                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {
                        console.log(error);
                    },
                    function (progress) {
                        console.log(progress);
                    }
                );

        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();