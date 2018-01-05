(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = ['$sessionStorage', '$state', '$stateParams', '$uibModal', '$log', '$scope', 'FoodService', 'RestaurantService', 'OrderService'];

    function RestaurantController($sessionStorage, $state, $stateParams, $uibModal, $log, $scope, FoodService, RestaurantService, OrderService) {

        var vm = this;
        vm.foodItems = [];
        vm.restaurant = '';
        vm.foods = [];
        vm.order = OrderService.getOrder();
        vm.message = '';

        init();

        function init() {
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }

            if ($sessionStorage.addFoods) {
                vm.addFoods = $sessionStorage.addFoods;
            }
            else {
                vm.addFoods = [];
            }

            $scope.$on('updateFoodList', function (event, data) {
                vm.foods = data;
            });

            vm.role = $sessionStorage.role;
            if ($stateParams.restaurant) {
                $sessionStorage.restaurant = $stateParams.restaurant;
                vm.restaurant = $sessionStorage.restaurant;
                vm.status = vm.restaurant.active;
            }

            else {
                vm.restaurant = $sessionStorage.restaurant;
                vm.status = vm.restaurant.active;
            }
        }

        //Getting Foods for the current Restaurant
        vm.getFood = function () {
            if (vm.restaurant) {
                FoodService.getFoodList(vm.restaurant.id)
                    .then(
                        function (answer) {
                            vm.foods = answer.data;
                        },
                        function (error) {
                            $log.info(error);
                        },
                        function (progress) {
                            $log.info(progress);
                        }
                    );
            }
        };

        vm.getFood();

        vm.addFood = function () {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/food/food.html',
                controller: 'FoodController',
                controllerAs: 'foodCtrl',
                resolve: {
                    addRestaurant: function () {
                        return vm.restaurant;
                    },
                    editFood: function () {
                        return null;
                    },
                    deleteFood: function () {
                        return null;
                    },
                    restaurantId: function () {
                        return vm.restaurant.id;
                    },
                    foods: function () {
                        return vm.addFoods;
                    }
                }

            });
            modalInstance.result.then(function (food) {

                food.restaurantId = vm.restaurant.id;
                food.restaurantName = vm.restaurant.name;
                vm.addFoods.push(food);
                $sessionStorage.addFoods = vm.addFoods;
                $log.info('Add food modal closed on ' + new Date());

            }, function () {
                $log.info('Add food modal dismissed on ' + new Date());
            });
        };

        vm.add = function (food) {
            vm.foods.push(food);
        };

        if ($sessionStorage.role === 'admin') {
            vm.editFood = function (food) {
                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/food/food.html',
                    controller: 'FoodController',
                    controllerAs: 'foodCtrl',
                    resolve: {
                        editFood: function () {
                            return food;
                        },
                        deleteFood: function () {
                            return null;
                        },
                        addRestaurant: function () {
                            return null;
                        },
                        restaurantId: function () {
                            return vm.restaurant.id;
                        },
                        foods: function () {
                            return vm.addFoods;
                        }
                    }
                });
                modalInstance.result.then(function (food) {
                    vm.edit(food);
                    $log.info('Edit food modal closed on ' + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info('Edit food modal dismissed on ' + new Date());
                });
            };

            vm.edit = function (food) {
                var pos;
                vm.foods.forEach(function (item, index) {
                    if (item.id === food.id) {
                        pos = index;
                    }
                });
                vm.foods[pos] = food;
            };

            vm.deleteFood = function (food) {
                vm.message = '';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/food/food-delete-confirm-modal.html',
                    controller: 'FoodController',
                    controllerAs: 'foodCtrl',
                    size: 'sm',
                    resolve: {
                        editFood: function () {
                            return null;
                        },
                        deleteFood: function () {
                            return food;
                        },
                        addRestaurant: function () {
                            return null;
                        },
                        restaurantId: function () {
                            return vm.restaurant.id;
                        },
                        foods: function () {
                            return vm.addFoods;
                        }
                    }
                });
                modalInstance.result.then(function (food) {
                    vm.delete(food);
                    $log.info('Delete food modal closed on ' + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info('Delete food modal dismissed on ' + new Date());
                });

                vm.delete = function (food) {
                    var pos;
                    vm.foods.forEach(function (item, index) {
                        if (item.id === food.id) {
                            pos = index;
                        }
                    })
                    vm.foods.splice(pos, 1);
                };
            };
        }

        vm.addOrder = function (food, restaurantName) {
            var order = {
                id: food.id,
                name: food.name,
                restaurantName: restaurantName,
                price: food.price
            };

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/add-to-cart/cart.html',
                controller: 'CartController as cartCtrl',
                size: 'md',
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    $log.info('Add order modal closed on ' + new Date());
                },
                function () {
                    $log.info('Add order modal dismissed on ' + new Date());
                }
            );
        };

        vm.deleteOrder = function (food) {
            OrderService.deleteOrder(food);
            vm.order = OrderService.getOrder();
        };

        vm.confirmOrder = function () {
            $state.go('order');
        };

        vm.restaurantStatus = function (id, status) {
            if (status) {
                RestaurantService.activateRestaurant(id).then(function (success) {
                    $log.info(success.data);
                }, function (error) {
                    $log.info(error);
                });
            }
            else {
                RestaurantService.deactivateRestaurant(id).then(function (success) {
                    $log.info(success.data);
                }, function (error) {
                    $log.info(error);
                });
            }
            $sessionStorage.restaurant.active = status;
        };

        //Add Food Functions
        vm.deleteFoodToAdd = function (food) {
            var pos;
            vm.addFoods.forEach(function (item, index) {
                if (item.name === food.name && item.restaurantId === food.restaurantId) {
                    pos = index;
                }
            })
            vm.addFoods.splice(pos, 1);
            $sessionStorage.addFoods = vm.addFoods;
        };

        vm.confirmAdd = function () {
            var confirmAddFoods = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/food/food-add-confirm-modal.html',
                controller: 'FoodController  as foodCtrl',
                size: 'sm',
                resolve: {
                    foods: function () {
                        return vm.addFoods;
                    },
                    editFood: function () {
                        return null;
                    },
                    deleteFood: function () {
                        return null;
                    },
                    addRestaurant: function () {
                        return null;
                    },
                    restaurantId: function () {
                        return null;
                    }
                }
            });
            confirmAddFoods.result.then(
                function (foods) {
                    foods.forEach(function (food) {
                        if (vm.restaurant.id === food.restaurantId) {
                            vm.foods.push(food);
                        }
                    })
                    vm.addFoods = [];
                    $sessionStorage.addFoods = vm.addFoods;
                    $log.info('Confirm add modal closed on ' + new Date());
                },
                function () {
                    $log.info('Confirm add modal dismissed on ' + new Date());
                }
            );

        };

    }
})();