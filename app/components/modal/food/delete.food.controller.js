(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("DeleteFoodController", DeleteFoodController);
    DeleteFoodController.$inject = ["$uibModalInstance", "FoodService", "foodParam", "APP_CONSTANT",'$scope','$rootScope'];

    function DeleteFoodController($uibModalInstance, FoodService, foodParam, APP_CONSTANT,$scope,$rootScope) {
        var vm = this;

        vm.delFoodMsg = APP_CONSTANT.DELETE_FOOD_MSG;

        vm.ok = function () {
             var food = foodParam;
             FoodService.deleteFood(food);
             $scope.$watch(function(){
                return FoodService.getFoodList();
                },
                 function(value){
                    $rootScope.$broadcast('updateFoodList',{
                    foodList:value
                    })
             });
             $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    };
})();