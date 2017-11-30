(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$scope", "$state", "APP_CONSTANT", "$uibModal", "RestaurantService", "FoodService", "$sessionStorage", "$log"];

    function DashboardController($scope, $state, APP_CONSTANT, $uibModal, RestaurantService, FoodService, $sessionStorage, $log) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.foodItems = FoodService.getFoodList();
        vm.restaurants = RestaurantService.getRestaurantList();console.log(vm.restaurants)
        vm.message = "";
        vm.userName = $sessionStorage.username;
        vm.role = $sessionStorage.role;
        vm.foods=[];
        if($sessionStorage.order){
            vm.order = $sessionStorage.order;
        }
        else {
            vm.order=[];
        }
        // vm.selected=vm.restaurants[0];console.log(vm.selected)

        if ($sessionStorage.username) {
            if(vm.role == 'admin'){
                vm.foods = vm.foodItems;
            }
            vm.selectRestaurant =function (n) {
                var restaurant =  n.name;
                vm.foods =[];
                vm.foodItems.forEach(function (food) {
                    if(food.restaurant == restaurant){
                        console.log(food);
                        vm.foods.push(food);
                    }
                })
            }

            vm.selectFood = function (select,food) {
                if(select){
                    if(vm.order.indexOf(food)!= -1){
                        vm.order.push(food);
                    }
                }
                else {
                    vm.order.splice(vm.order.indexOf(food),1);
                    console.log(vm.order)
                }
                $sessionStorage.order=vm.order;
            }

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
                    vm.message = RestaurantService.getAlertMessage()
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
                    controller: "RestaurantController",
                    controllerAs: "restaurantCtrl"
                });

                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage()
                }, function () {
                    $log.info("Add restaurant modal dismissed on " + new Date());
                });
            };

            // vm.addFood = function () {
            //     vm.message = "";
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         ariaLabelledBy: "modal-title",
            //         ariaDescribedBy: "modal-body",
            //         backdrop: false,
            //         templateUrl: "components/modal/food/food.html",
            //         controller: "FoodController",
            //         controllerAs: "foodCtrl"
            //     });
            //     modalInstance.result.then(function () {
            //         vm.message = FoodService.getAlertMessage();
            //     }, function () {
            //         $log.info("Add food modal dismissed on " + new Date());
            //     });
            // };

            if ($sessionStorage.role == "admin") {
                vm.editFood = function (foodId) {
                    vm.message = "";
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: "modal-title",
                        ariaDescribedBy: "modal-body",
                        backdrop: false,
                        templateUrl: "components/modal/food/edit-food.html",
                        controller: "EditFoodController",
                        controllerAs: "editFoodCtrl",
                        resolve: {
                            food: function (FoodService) {
                                return FoodService.getFood(foodId);
                            }
                        }
                    });
                    modalInstance.result.then(function (response) {
                        FoodService.getFoodList().filter(function (food) {
                            if (food.id === response.id) {
                                food.name = response.name;
                                food.restaurant = response.restaurant;
                                food.price = response.price;
                                food.contact = response.contact;
                            }
                        });
                        vm.message = FoodService.getAlertMessage();
                    }, function () {
                        $log.info("Edit food modal dismissed on " + new Date());
                    });
                }
            };
        }
        else {
            $state.go("login");
        }

        vm.placeOrder = function () {
            console.log('Order Placed');
            $state.go('order')
        }
    }

})();