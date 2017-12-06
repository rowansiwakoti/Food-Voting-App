(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = ["FoodService", "$sessionStorage", "$state", "$stateParams", '$uibModal', '$log', '$scope','OrderService'];

    function RestaurantController(FoodService, $sessionStorage, $state, $stateParams, $uibModal, $log, $scope,OrderService) {
        var vm = this;
        vm.foodItems = FoodService.getFoodList();
        vm.restaurant = "";
        vm.foods = [];
        vm.order = OrderService.getOrder();


        $scope.$on("updateFoodList", function (event, data) {
            vm.foods = data;
        });

        vm.role = $sessionStorage.role;console.log(vm.role);
        if ($stateParams.restaurant) {
            $sessionStorage.restaurant = $stateParams.restaurant;
            vm.restaurant = $sessionStorage.restaurant;
        }
        else {
            vm.restaurant = $sessionStorage.restaurant;
        }

        //Getting Foods for the current Restaurant

        vm.getFood = function () {
            vm.foods = [];
            vm.foodItems.forEach(function (food) {
                if (food.restaurant === vm.restaurant) {
                    vm.foods.push(food);
                }
            });
        }
        vm.getFood();
        $scope.$on('updateFoodList', function (event, data) {
            vm.foodItems = FoodService.getFoodList();
            vm.getFood();
        });

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
                    deleteFood: function(){
                        return null;
                    }
                }

            });
            modalInstance.result.then(function () {
                vm.foodItems = FoodService.getFoodList();
                vm.getFood();
                $log.info("Add food modal closed on " + new Date());

            }, function () {
                $log.info("Add food modal dismissed on " + new Date());
            });
        };

        if ($sessionStorage.role === "admin") {
            vm.editFood = function (foodId) {
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
                        editFood: function (FoodService) {
                            return FoodService.getFood(foodId);
                        },
                        deleteFood: function(){
                            return null;
                        },
                        addRestaurant: function () {
                            return null;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    $log.info("Edit food modal closed on " + new Date());
                    vm.foodItems = FoodService.getFoodList();
                    vm.getFood();
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Edit food modal dismissed on " + new Date());
                });
            };

            vm.deleteFood = function(food){
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
                        editFood: function() {
                            return null;
                        },
                        deleteFood: function(){
                            return food;
                        },
                        addRestaurant: function () {
                            return null;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    $log.info("Delete food modal closed on " + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Delete food modal dismissed on " + new Date());
                });
            };
//Adding to the order
        }

        vm.addOrder = function (food) {
            OrderService.addOrder(food);
            vm.order = OrderService.getOrder();
            console.log(vm.order);
        };

        vm.deleteOrder = function (food) {
            OrderService.deleteOrder(food);
            vm.order = OrderService.getOrder();
            console.log(food,': delete order');
        }

        vm.confirmOrder = function () {
            $state.go('order');
            console.log('Confirm Order');
        }
    }
})();