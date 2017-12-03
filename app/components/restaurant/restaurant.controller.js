(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantCtrl',RestaurantCtrl);
    RestaurantCtrl.$inject=["FoodService", "$sessionStorage","$state","$stateParams",'$uibModal','$log','$scope'];

    function RestaurantCtrl(FoodService,$sessionStorage,$state,$stateParams,$uibModal,$log,$scope) {
        var that = this;
        that.foodItems = FoodService.getFoodList();
        that.restaurant;
        that.foods=[];
        that.role=$sessionStorage.role;

        //Getting/Setting the Current Restaurant
        if($stateParams.restaurant){
            $sessionStorage.restaurant=$stateParams.restaurant;
            that.restaurant = $sessionStorage.restaurant;
        }
        else {
            that.restaurant = $sessionStorage.restaurant;
        }

        //Getting Foods for the current Restaurant

        that.getFood = function () {
            that.foods = [];
            that.foodItems.forEach(function (food) {
                if(food.restaurant == that.restaurant){
                    that.foods.push(food);
                }
            })
        }
        that.getFood();
        $scope.$on('updateFoodList',function (event,data) {
            that.foodItems = FoodService.getFoodList();
            that.getFood();
        })

        that.message;
        that.addFood = function () {
            that.message = "";
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/food/food.html",
                controller: "FoodController",
                controllerAs: "foodCtrl",
                resolve:{
                    restaurant:function () {
                        return that.restaurant;
                    }
                }
            });
            modalInstance.result.then(function () {
                that.foodItems = FoodService.getFoodList();
                that.getFood();
                $log.info("Add food modal closed on " + new Date());
            }, function () {
                $log.info("Add food modal dismissed on " + new Date());
            });
        };

        if ($sessionStorage.role == "admin") {
            that.editFood = function (foodId) {
                that.message = "";
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
                    $log.info("Edit food modal closed on " + new Date());
                    that.foodItems = FoodService.getFoodList();
                    that.getFood();
                    that.message = FoodService.getAlertMessage();
                }, function () {
                    $log.info("Edit food modal dismissed on " + new Date());
                });
            }
        };
    }
})();