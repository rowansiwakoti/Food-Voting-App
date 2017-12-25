(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = ["FoodService", "$sessionStorage", "$state", "$stateParams", '$uibModal', '$log', '$scope','OrderService'];

    function RestaurantController(FoodService, $sessionStorage, $state, $stateParams, $uibModal, $log, $scope,OrderService) {
        var vm = this;
        vm.foodItems = [];
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
            console.log(vm.restaurant)
            var list  = FoodService.getFoodList(vm.restaurant.id);
            list.then(
                function(answer) {
                 // console.log(answer.data)
                    vm.foods = answer.data;
                },
                function(error) {
                    console.log(error)
                },
                function(progress) {
                    console.log(progress)
                }
            )
        }
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
                    deleteFood: function(){
                        return null;
                    },
                    restaurantId:vm.restaurant.id
                }

            });
            modalInstance.result.then(function (food) {
                vm.add(food);
                $log.info("Add food modal closed on " + new Date());

            }, function () {
                $log.info("Add food modal dismissed on " + new Date());
            });
        };

        vm.add = function (food) {
            vm.foods.push(food);
        }

        if ($sessionStorage.role === "admin") {
            vm.editFood = function (food) {console.log(food)
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
                        deleteFood: function(){
                            return null;
                        },
                        addRestaurant: function () {
                            return null;
                        },
                        restaurantId:vm.restaurant.id
                    }
                });
                modalInstance.result.then(function (food) {console.log(food)
                    vm.edit(food);
                    $log.info("Edit food modal closed on " + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Edit food modal dismissed on " + new Date());
                });
            };

            vm.edit = function (food) {console.log(food,'edit function')
                var pos;
                vm.foods.forEach(function (item,index) {
                    if(item.id == food.id){
                        pos = index;
                    }
                })
                vm.foods[pos] = food;
            }

            vm.deleteFood = function(food){console.log('food:',food)
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
                        },
                        restaurantId:vm.restaurant.id
                    }
                });
                modalInstance.result.then(function (food) {console.log(food);
                    vm.delete(food);
                    $log.info("Delete food modal closed on " + new Date());
                    vm.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Delete food modal dismissed on " + new Date());
                });

                vm.delete = function (food) {
                    var pos;
                    vm.foods.forEach(function (item,index) {
                        if(item.id == food.id){
                            pos = index;
                        }
                    })
                    vm.foods.splice(pos,1);
                }
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