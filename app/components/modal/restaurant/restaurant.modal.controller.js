(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantModalController", RestaurantModalController);

    RestaurantModalController.$inject = ["$uibModalInstance", "RestaurantService", "APP_CONSTANT", "delRestaurant", "editRestaurant",'$scope'];

    function RestaurantModalController($uibModalInstance, RestaurantService, APP_CONSTANT, delRestaurant, editRestaurant,$scope) {
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
            var add = RestaurantService.addRestaurant(restaurant);
            add.then(
                    function(answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function(error) {
                        console.log(error)
                    },
                    function(progress) {
                        console.log(progress)
                    }
            )
            RestaurantService.setAlertMessage(restaurant.name + " " + APP_CONSTANT.ADD_MSG);

        };

        vm.editRestaurant = function (restaurant) {
            var edit = RestaurantService.editRestaurant(restaurant);
            edit.then(
                function(answer) {
                    console.log(restaurant);
                    $uibModalInstance.close(restaurant);
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            )
        };

        vm.deleteRestaurant = function () {
            var del = RestaurantService.deleteRestaurant(delRestaurant);
            del.then(
                function(answer) {
                    $uibModalInstance.close(delRestaurant.id);
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            )

        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();