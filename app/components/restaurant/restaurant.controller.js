(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantCtrl',RestaurantCtrl);
    RestaurantCtrl.$inject=["FoodService", "$sessionStorage","$state","$stateParams",'$uibModal','$log','$scope','OrderService'];

    function RestaurantCtrl(FoodService,$sessionStorage,$state,$stateParams,$uibModal,$log,$scope,OrderService) {
        var that = this;
        that.foodItems = FoodService.getFoodList();
        that.restaurant;
        that.foods = [];
        that.quantity = [];
        that.selection = [];
        that.order = OrderService.getOrder();
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
            that.quantity.length = that.foods.length;
            that.selection.length = that.foods.length;
            // that.quantity.forEach(function (quan) {
            //     quan = 0;
            // })
            for(var i=0;i<that.quantity.length;i++){
                that.quantity[i]=0
            }
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

        //Increase and Decrease Quantity
        that.quantityIncrease = function (num,food) {
             if(that.quantity[num]<5){
                 ++that.quantity[num];
             }
             that.order ={
                 food:food,
                 quantity:that.quantity[num],
                 user:$sessionStorage.username
             }
             OrderService.addOrder(that.order);
        }

        that.quantityDecrease = function (num,food) {
            if(that.quantity[num]>0){
                --that.quantity[num];
            }
            that.order ={
                food:food,
                quantity:that.quantity[num],
                user:$sessionStorage.username
            }
            OrderService.addOrder(that.order);
        }
        //While the food is checked
        that.selectFood = function ($index,food) {
                OrderService.addOrder(food);
                that.order = OrderService.getOrder();
            console.log('add food to order')
        }

        that.removeFood = function (food) {
            console.log('delete: ' , food);
            OrderService.deleteOrder(food);
            that.order = OrderService.getOrder();
        }

        //Placing the order
        that.placeOrder = function () {
            $state.go('order')
        }
    }
})();