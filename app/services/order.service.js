(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .factory('OrderService',OrderService);

    OrderService.$inject=['$sessionStorage'];

    function OrderService($sessionStorage) {
        var orderSvc = {};
        var orderList = [];
        orderSvc.initOrder = function () {
            console.log('order list initialize')
            orderList = [];
        }
//Add to the order list
        orderSvc.addOrder = function (order) {
            order.quantity = 1;
            var flag=1;
            orderList.forEach(function (item) {
                if(item.id == order.id){
                    flag=0;
                }
            })
            if(flag==1){
                orderList.push(order);
            }
            // console.log(orderList);
        }

//Delete the order from the order list
        orderSvc.deleteOrder = function (order) {
            var flag = 1;
            var position;
            for(var i=0;i<orderList.length;i++){
                if(order.id == orderList[i].id){
                    position = i;
                }
            }
            orderList.splice(position,1);
            console.log(orderList,position);
        }
//Return the order list
        orderSvc.getOrder = function () {
            return  orderList;
        }
//Increase the quantity
        orderSvc.increseQuantity = function (food) {
            if(food.quantity<5){
                for(var i=0;i<orderList.length;i++){
                    if(food.id == orderList[i].id){
                        orderList[i].quantity += 1;
                    }
                }
            }
            console.log('increase: ',orderList)
        }
//Decrease the quantity
        orderSvc.decreaseQuantity = function (food) {
            if(food.quantity>1){
                for(var i=0;i<orderList.length;i++){
                    if(food.id == orderList[i].id){
                        orderList[i].quantity -= 1;
                    }
                }
            }
            console.log('decrease: ',orderList)
        }
        return orderSvc;
    }
})();