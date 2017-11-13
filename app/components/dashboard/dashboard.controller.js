(function () {

    "use strict";

    angular.module("foodVotingApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["commonService", "$rootScope", "$state", "APP", "$uibModal", "restaurantService", "foodService", "$sessionStorage"];

    function DashboardController(commonService, $rootScope, $state, APP, $uibModal, restaurantService, foodService, $sessionStorage) {

        var vm = this;

        vm.appName = APP.APP_NAME;
        vm.title = APP.PAGE_TITLE;
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
                if (confirm("Are you sure want to log out?")) {
                    $sessionStorage.username = "";
                    $state.go("login");
                }
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
                        vm.message = foodService.getAlertMessage();
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