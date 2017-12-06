(function () {
    "use strict";

    angular.module('FoodVotingApp')
        .controller('OrderCtrl',OrderCtrl);

    OrderCtrl.$inject=['$sessionStorage','OrderService'];

    function OrderCtrl($sessionStorage,OrderService) {
        var that=this;
        that.order = OrderService.getOrder();
        that.quantity = [];

//Deleting an item from the order
        that.deleteOrder = function(order){
            OrderService.deleteOrder(order);
            that.order = OrderService.getOrder();
        }
//Increase the quantity
        that.quantityIncrease = function (index,food) {
            OrderService.increseQuantity(food);
            that.order = OrderService.getOrder();
        }
//Decrease the quantity
        that.quantityDecrease = function (index,food) {
            OrderService.decreaseQuantity(food);
            that.order = OrderService.getOrder();
        }
//Calculate the total amount
        that.getTotal = function () {
            var total = 0;
            that.order.forEach(function (order) {
                total += order.price * order.quantity;
            })
            return total;
        }
    }
})();