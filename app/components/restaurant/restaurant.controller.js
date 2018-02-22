(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = [
        '$sessionStorage',
        '$state',
        '$stateParams',
        '$uibModal',
        '$log',
        '$scope',
        'FoodService',
        'RestaurantService',
        'OrderService'
    ];

    function RestaurantController($sessionStorage, $state, $stateParams, $uibModal, $log, $scope, FoodService, RestaurantService, OrderService) {

        var vm = this;
        vm.foodItems = [];
        vm.restaurant = '';
        vm.foods = [];
        vm.order = OrderService.getOrder();
        vm.message = '';
        vm.role = $sessionStorage.role;

        $scope.$on("infoMsg", function (data) {
            vm.infoMsg = RestaurantService.getAlertMessage();
        });

        vm.addFood = addFood;
        vm.editFood = editFood;
        vm.deleteFood = deleteFood;
        vm.addOrder = addOrder;
        vm.deleteOrder = deleteOrder;
        vm.confirmOrder = confirmOrder;
        vm.restaurantStatus = restaurantStatus;
        vm.deleteFoodToAdd = deleteFoodToAdd;
        vm.confirmAdd = confirmAdd;
        vm.getFoods = getFoods;

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

            if ($stateParams.restaurant) {
                $sessionStorage.restaurant = $stateParams.restaurant;
            }
            vm.restaurant = $sessionStorage.restaurant;
            if ($sessionStorage.restaurant) {
                vm.status = $sessionStorage.restaurant.active;
            }
        }

        //Getting Foods for the current Restaurant
        vm.currentPage = 0;
        vm.totalFoods = 0;

        getFoods();

        function getFoods() {
            if (vm.restaurant) {
                FoodService.getFoodList(vm.restaurant.id, vm.currentPage - 1)
                    .then(
                        function (answer) {
                            vm.foods = answer.data.responseData;
                            vm.totalFoods = answer.data.pageModel.count;
                        },
                        function (error) {
                            $log.info(error);
                        }
                    );
            }
        }

        function addFood() {
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
                    food: function () {
                        return null;
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
        }


        function editFood(food) {
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
                    food: function () {
                        return food;
                    },
                    foods: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(function (food) {
                edit(food);
                vm.message = FoodService.getAlertMessage();
            }, function () {
                $log.info('Edit food modal dismissed on ' + new Date());
            });
        }

        function edit(food) {
            var pos;
            angular.forEach(vm.foods, function (item, index) {
                if (item.id === food.id) {
                    pos = index;
                }
            });
            vm.foods[pos] = food;
        }

        function deleteFood(food) {
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
                    food: function () {
                        return food;
                    },
                    foods: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(function (food) {
                deleteFoo(food);
                $log.info('Delete food modal closed on ' + new Date());
                vm.message = FoodService.getAlertMessage();
            }, function () {
                $log.info('Delete food modal dismissed on ' + new Date());
            });

            function deleteFoo(food) {
                var pos;
                angular.forEach(vm.foods, function (item, index) {
                    if (item.id === food.id) {
                        pos = index;
                    }
                })
                vm.foods.splice(pos, 1);
            }
        }

        function addOrder(food, restaurantName) {
            RestaurantService.setAlertMessage('');
            var order = {
                id: food.id,
                name: food.name,
                restaurantName: restaurantName,
                price: food.price
            };

            var previousOrders = OrderService.getOrder();

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/cart/cart.html',
                controller: 'CartController as cartCtrl',
                size: 'md',
                resolve: {
                    order: function () {
                        return order;
                    },
                    previousOrders: function () {
                        return previousOrders;
                    }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function deleteOrder(food) {
            OrderService.deleteOrder(food);
            vm.order = OrderService.getOrder();
        }

        function confirmOrder() {
            $state.go('order');
        }

        function restaurantStatus(id, status) {
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
            if(angular.isDefined($sessionStorage.restaurant)) {
                $sessionStorage.restaurant.active = status;
            }
        }

        function deleteFoodToAdd(food) {
            var pos;
            angular.forEach(vm.addFoods, function (item, index) {
                if (item.name === food.name && item.restaurantId === food.restaurantId) {
                    pos = index;
                }
            });
            vm.addFoods.splice(pos, 1);
            $sessionStorage.addFoods = vm.addFoods;
        }

        function confirmAdd() {
            var modalInstance = $uibModal.open({
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
                    food: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(
                function (foods) {
                    angular.forEach(foods, function (food) {
                        if (vm.restaurant.id === food.restaurantId) {
                            if (vm.foods.length < 10) {
                                vm.foods.push(food);
                            }
                        }
                    });
                    vm.addFoods = [];
                    $sessionStorage.addFoods = vm.addFoods;
                    $log.info('Confirm add modal closed on ' + new Date());
                },
                function () {
                    $log.info('Confirm add modal dismissed on ' + new Date());
                }
            );

        }

    }
})();