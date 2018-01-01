(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = ["$rootScope", "FoodService", "RestaurantService", "$sessionStorage", "$state", "$stateParams", '$uibModal', '$log', '$scope', 'OrderService'];

    function RestaurantController($rootScope, FoodService, RestaurantService, $sessionStorage, $state, $stateParams, $uibModal, $log, $scope, OrderService) {
        var vm = this;
        vm.foodItems = [];
        vm.restaurant = "";
        vm.foods = [];

        if ($sessionStorage.addFoods) {
            vm.addFoods = $sessionStorage.addFoods;
        }
        else {
            vm.addFoods = [];
        }

        vm.order = OrderService.getOrder();


        $scope.$on("updateFoodList", function (event, data) {
            vm.foods = data;
        });

        vm.role = $sessionStorage.role;
        if ($stateParams.restaurant) {
            console.log($stateParams.restaurant);
            $sessionStorage.restaurant = $stateParams.restaurant;
            vm.restaurant = $sessionStorage.restaurant;
            vm.status = vm.restaurant.active;
        }
        else {
            vm.restaurant = $sessionStorage.restaurant;
            vm.status = vm.restaurant.active;
        }

        //Getting Foods for the current Restaurant
        vm.getFood = function () {
            var list = FoodService.getFoodList(vm.restaurant.id);
            list.then(
                function (answer) {
                    // console.log(answer.data)
                    vm.foods = answer.data;
                },
                function (error) {
                    console.log(error);
                },
                function (progress) {
                    console.log(progress);
                }
            );
        };

        vm.getFood();
        vm.message = "";
        vm.addFood = function () {
            vm.message = "";
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/food/food.html",
                controller: "FoodController",
                controllerAs: "foodCtrl",
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
                    restaurantId: vm.restaurant.id
                }

            });
            modalInstance.result.then(function (food) {
                // vm.add(food);

                food.restaurantId = vm.restaurant.id;
                food.restaurantName = vm.restaurant.name;
                vm.addFoods.push(food);
                $sessionStorage.addFoods = vm.addFoods;
                console.log($sessionStorage.addFoods);
                $log.info("Add food modal closed on " + new Date());

            }, function () {
                $log.info("Add food modal dismissed on " + new Date());
            });
        };

        vm.add = function (food) {
            vm.foods.push(food);
        };

        if ($sessionStorage.role === "admin") {
            vm.editFood = function (food) {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/food/food.html",
                    controller: "FoodController",
                    controllerAs: "foodCtrl",
                    resolve: {
                        editFood: food,
                        deleteFood: function () {
                            return null;
                        },
                        addRestaurant: function () {
                            return null;
                        },
                        restaurantId: vm.restaurant.id
                    }
                });
                modalInstance.result.then(function (food) {
                    vm.edit(food);
                    $log.info("Edit food modal closed on " + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Edit food modal dismissed on " + new Date());
                });
            };

            vm.edit = function (food) {
                var pos;
                vm.foods.forEach(function (item, index) {
                    if (item.id === food.id) {
                        pos = index;
                    }
                })
                vm.foods[pos] = food;
            };

            vm.deleteFood = function (food) {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/food/food-delete-confirm-modal.html",
                    controller: "FoodController",
                    controllerAs: "foodCtrl",
                    size: "sm",
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
                        restaurantId: vm.restaurant.id
                    }
                });
                modalInstance.result.then(function (food) {
                    vm.delete(food);
                    $log.info("Delete food modal closed on " + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Delete food modal dismissed on " + new Date());
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

            OrderService.addOrder(food, restaurantName);
            vm.order = OrderService.getOrder();
            $scope.$watch(function () {
                return vm.order;
            }, function (newValue) {console.log(newValue);
                $rootScope.$broadcast("updateOrders", newValue);
            });
            // console.log(vm.order);
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
                    console.log(success.config.url);
                    $sessionStorage.restaurant.active = true;
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                RestaurantService.deactivateRestaurant(id).then(function (success) {
                    console.log(success.config.url);
                    $sessionStorage.restaurant.active = false;
                }, function (error) {
                    console.log(error);
                });
            }
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
            console.log(food, pos);
        };

        vm.confirmAdd = function () {
            var confirmAddFoods = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/food/food-add.html",
                controller: 'FoodAddConfirmController  as foodAddCtrl',
                size: 'sm',
                resolve: {
                    foods: function () {
                        return vm.addFoods;
                    }
                }
            });
            confirmAddFoods.result.then(
                function (foods) {
                    foods.forEach(function (food) {
                        if (vm.restaurant.id == food.restaurantId) {
                            vm.foods.push(food);
                        }
                    })
                    vm.addFoods = [];
                    $sessionStorage.addFoods = vm.addFoods;
                    console.log('add modal closed');
                },
                function () {
                    console.log('add modal dismissed');
                }
            );

        };


    }
})();