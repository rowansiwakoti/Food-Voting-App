(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .controller('RestaurantCtrl',RestaurantCtrl);
    RestaurantCtrl.$inject=["FoodService", "$sessionStorage","$state","$stateParams",'$uibModal','$log'];

    function RestaurantCtrl(FoodService,$sessionStorage,$state,$stateParams,$uibModal,$log) {
        var that = this;
        that.foodItems = FoodService.getFoodList();
        that.restaurant;
        that.foods=[];
        that.role=$sessionStorage.role;
        if($stateParams.restaurant){
            $sessionStorage.restaurant=$stateParams.restaurant;
            that.restaurant = $sessionStorage.restaurant;
        }
        else {
            that.restaurant = $sessionStorage.restaurant;
        }

        that.foodItems.forEach(function (food) {
            if(food.restaurant == that.restaurant){
                that.foods.push(food);
            }
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
                controllerAs: "foodCtrl"
            });
            modalInstance.result.then(function () {
                that.message = FoodService.getAlertMessage();
                that.foodItems=FoodService.getFoodList();
                that.foods;console.log('m here')
                that.foodItems.forEach(function (food) {
                    if(food.restaurant == that.restaurant){
                        that.foods.push(food);
                    }
                })
            }, function () {
                $log.info("Add food modal dismissed on " + new Date());
            });
        };

    }
})();