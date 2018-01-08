(function () {

    'use strict';

    angular.module('FoodOrderingApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$uibModal', '$sessionStorage', '$log', 'APP_CONSTANT', 'RestaurantService', 'OrderService'];

    function DashboardController($state, $uibModal, $sessionStorage, $log, APP_CONSTANT, RestaurantService, OrderService) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.restaurants = [];
        vm.message = '';
        vm.firstName = $sessionStorage.firstName;
        vm.role = $sessionStorage.role;

        vm.initRestaurants = function () {
            RestaurantService.getRestaurantList().then(
                function (answer) {
                    vm.restaurants = answer.data;
                },
                function (error) {
                    $log.info(error);
                }
            );
        };
        vm.initRestaurants();


        if ($sessionStorage.emailId) {
            vm.userLogout = function () {
                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/logout/logout.html',
                    controller: 'LogoutController',
                    controllerAs: 'logoutCtrl',
                    size: 'sm'
                });
                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                    OrderService.initOrder();
                }, function () {
                    $log.info('User Logout modal dismissed on ' + new Date());
                });
            };

            vm.addRestaurant = function () {
                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/restaurant/restaurant.html',
                    controller: 'RestaurantModalController',
                    controllerAs: 'restaurantModalCtrl',
                    resolve: {
                        delRestaurant: function () {
                            return null;
                        },
                        editRestaurant: function () {
                            return null;
                        }
                    }
                });
                modalInstance.result.then(function (restaurant) {
                    vm.message = RestaurantService.getAlertMessage();
                    vm.add(restaurant);
                }, function () {
                    $log.info('Add restaurant modal dismissed on ' + new Date());
                });
            };

            vm.add = function (restaurant) {
                vm.restaurants.push(restaurant);
            };

            vm.deleteRestaurant = function (restaurant) {

                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/restaurant/restaurant-delete-confirm-modal.html',
                    controller: 'RestaurantModalController',
                    controllerAs: 'restaurantModalCtrl',
                    size: 'sm',
                    resolve: {
                        delRestaurant: function () {
                            return restaurant;
                        },
                        editRestaurant: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function (id) {
                    vm.message = RestaurantService.getAlertMessage();
                    vm.delete(id);
                }, function () {
                    $log.info('Delete restaurant modal dismissed on ' + new Date());
                });
            };

            vm.delete = function (id) {
                var pos;
                vm.restaurants.forEach(function (restro, index) {
                    if (restro.id === id) {
                        pos = index;
                    }
                })
                vm.restaurants.splice(pos, 1);
            };

            vm.editRestaurant = function (editRestaurant) {
                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/restaurant/restaurant.html',
                    controller: 'RestaurantModalController',
                    controllerAs: 'restaurantModalCtrl',
                    resolve: {
                        editRestaurant: function () {
                            return editRestaurant;
                        },
                        delRestaurant: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function (restaurant) {
                    vm.message = RestaurantService.getAlertMessage();
                    vm.edit(restaurant);
                }, function () {
                    $log.info('Edit restaurant modal dismissed on ' + new Date());
                });
            };

            vm.edit = function (restaurant) {
                var pos;
                vm.restaurants.forEach(function (restro, index) {
                    if (restro.id === restaurant.id) {
                        pos = index;
                    }
                });
                vm.restaurants[pos] = restaurant;
            };

        }
        else {
            $state.go('login');
        }

        vm.placeOrder = function () {
            $state.go('order');
        };
    }

})();
