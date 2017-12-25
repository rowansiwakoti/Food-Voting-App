(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .factory("FoodService", FoodService);

    FoodService.$inject = ["$sessionStorage",'$http'];

    function FoodService($sessionStorage,$http) {

        var foodSvc = {};
        var alertMessage = "";
        var foodList = [];

        // Get Food List
        foodSvc.getFoodList = function (id) {console.log(id);
            return ($http.get('http://localhost:8080/restaurants/'+id+'/foods'))
        };

        //Delete Food from the list
        foodSvc.deleteFood = function (food) {
            return($http.delete('http://localhost:8080/foods/'+food.id))
        };

        //Edit Food
        foodSvc.editFood = function (food) {
            console.log(food)
            var req ={
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                data:food,
                url:'http://localhost:8080/foods/'+food.id
            }
            return($http(req));
        };

        //Get Food
        foodSvc.getFood = function (id) {
            var food = foodList.filter(function (food) {
                return food.id === id;
            });
            return food[0];
        };

        //Add Food to the List
        foodSvc.addFood = function (food,restaurantId) {
            var url = 'http://localhost:8080/restaurants/'+restaurantId;
            var req = {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:url,
                data:food
            }
            return($http(req));
        };

        // Set and Get Alert Messages
        foodSvc.setAlertMessage = function (msg) {
            alertMessage = msg;
        };
        foodSvc.getAlertMessage = function () {
            return alertMessage;
        };

        // Return food service
        return foodSvc;
    }
})();
