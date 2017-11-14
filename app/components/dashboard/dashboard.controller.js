(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$scope", "$state", "APP", "$uibModal", "restaurantService", "foodService", "$sessionStorage", "$log"];

    function DashboardController($scope, $state, APP, $uibModal, restaurantService, foodService, $sessionStorage, $log) {

        var vm = this;

        vm.appName = APP.APP_NAME;
        vm.foodItems = foodService.getFoodList();
        vm.message = "";

        vm.userName = $sessionStorage.username;
        vm.role = $sessionStorage.role;

        // $scope.$on("$stateChangeStart", function (event) {
        //     event.preventDefault();
        //     console.log("changing to ......");
        // });


        // $scope.$on('$locationChangeStart', function(event, next, current){
        //     // alert('Sorry ! Back Button is disabled');
        //     event.preventDefault();
        // });

        if ($sessionStorage.username) {

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
                    vm.message = restaurantService.getAlertMessage()
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
                    vm.message = restaurantService.getAlertMessage()
                }, function () {
                    $log.info("Add restaurant modal dismissed on " + new Date());
                });
            };

            vm.addFood = function () {
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    backdrop: false,
                    templateUrl: "components/modal/food/food.html",
                    controller: "FoodController",
                    controllerAs: "foodCtrl"
                });
                modalInstance.result.then(function () {
                    vm.message = foodService.getAlertMessage();
                }, function () {
                    $log.info("Add food modal dismissed on " + new Date());
                });
            };

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
                            food: function (foodService) {
                                return foodService.getFood(foodId);
                            }
                        }
                    });
                    modalInstance.result.then(function (response) {
                        foodService.getFoodList().filter(function (food) {
                            if (food.id === response.id) {
                                food.name = response.name;
                                food.restaurant = response.restaurant;
                                food.price = response.price;
                                food.contact = response.contact;
                            }
                        });
                        vm.message = foodService.getAlertMessage();
                    }, function () {
                        $log.info("Edit food modal dismissed on " + new Date());
                    });
                }
            }
            ;
        }
        else {
            $state.go("login");
        }
    }

})();