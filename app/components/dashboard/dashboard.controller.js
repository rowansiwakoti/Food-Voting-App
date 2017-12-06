(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$state", "APP_CONSTANT", "$uibModal", "RestaurantService", "FoodService", "$sessionStorage", "$log"];

    function DashboardController($state, APP_CONSTANT, $uibModal, RestaurantService, FoodService, $sessionStorage, $log) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.foodItems = FoodService.getFoodList();
        vm.restaurants = RestaurantService.getRestaurantList();

        vm.message = "";
        vm.emailId = $sessionStorage.emailId;
        vm.role = $sessionStorage.role;

        if ($sessionStorage.emailId) {

            vm.userLogout = function () {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/user-logout/logout.html",
                    controller: "LogoutController",
                    controllerAs: "logoutCtrl",
                    size: "sm"
                });

                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                }, function () {
                    $log.info("User Logout modal dismissed on " + new Date());
                });

            };

            vm.addRestaurant = function () {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/restaurant/restaurant.html",
                    controller: "RestaurantModalController",
                    controllerAs: "restaurantModalCtrl",
                    resolve: {
                        delRestaurant: function () {
                            return null;
                        },
                        editRestaurant: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                }, function () {
                    $log.info("Add restaurant modal dismissed on " + new Date());
                });
            };

            vm.deleteRestaurant = function (restaurant) {

                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/restaurant/restaurant-delete-confirm-modal.html",
                    controller: "RestaurantModalController",
                    controllerAs: "restaurantModalCtrl",
                    size: "sm",
                    resolve: {
                        delRestaurant: function () {
                            return restaurant;
                        },
                        editRestaurant: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                }, function () {
                    $log.info("Delete restaurant modal dismissed on " + new Date());
                });
            };

            vm.editRestaurant = function (editRestaurant) {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/restaurant/restaurant.html",
                    controller: "RestaurantModalController",
                    controllerAs: "restaurantModalCtrl",
                    resolve: {
                        editRestaurant: function () {
                            return editRestaurant;
                        },
                        delRestaurant: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                }, function () {
                    $log.info("Edit restaurant modal dismissed on " + new Date());
                });
            };
        }
        else {
            $state.go("login");
        }

        vm.placeOrder = function () {
            $state.go('order');
        };
    }

})();