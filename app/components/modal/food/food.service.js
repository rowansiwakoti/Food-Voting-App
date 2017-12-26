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
        foodSvc.addFoods = function (foods) {
            console.log(foods);
            var addFoods = [];
            var tempFood = {};
            foods.forEach(function (food,index) {
                addFoods.push({
                    name:food.name,
                    price:food.price,
                    restaurantId:food.restaurantId
                });
            });
            $sessionStorage.addFoods = [];
            var url = 'http://localhost:8080/foods';
            var req = {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:url,
                data:addFoods
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

        foodSvc.delteFromAddFoods = function (id) {
            var addFoods = $sessionStorage.addFoods;
            var tempFoods = [];
            if(addFoods){
                addFoods.forEach(function (food,index) {console.log(food);
                    if(food.restaurantId != id){
                        tempFoods.push(food)
                    }
                });
            }
            $sessionStorage.addFoods = tempFoods;
        }

        // Return food service
        return foodSvc;
    }
})();
