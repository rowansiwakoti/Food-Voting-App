(function () {
    "use strict";
    angular.module('FoodVotingApp')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$sessionStorage', '$http', '$rootScope'];

    function OrderService($sessionStorage, $http, $rootScope) {
        var orderSvc = {};
        var orderList = [];

        orderSvc.initOrder = function () {
            orderList = [];
        };

        //Add to the order list
        orderSvc.addOrder = function (order) {
            // order.quantity = 1;
            // order.restaurantName = restaurantName;
            var flag = 1;
            console.log($sessionStorage.orderList)
            // set flag to zero // ignores duplicate order
            if($sessionStorage.orderList){
                $sessionStorage.orderList.forEach(function (item) {
                    if (item.id === order.id) {
                        flag = 0;
                    }
                });
            }
            console.log(order,flag,$sessionStorage.orderList);
            if (flag === 1) {

                if ($sessionStorage.orderList) {
                    orderList = $sessionStorage.orderList;
                    orderList.push(order);
                    $sessionStorage.orderList = orderList;
                }
                else {
                    orderList.push(order);
                    $sessionStorage.orderList = orderList;
                    orderList = $sessionStorage.orderList;
                }
                $rootScope.$broadcast('updateOrdersInCart', orderList);
            }
        };

        orderSvc.confirmOrder = function (order) {
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: order,
                url: 'http://localhost:8080/order'
            };
            return ($http(req));
        };

        orderSvc.getLog = function (role,id) {
            var url;
            if(role == 'admin'){
                url = '';
            }
            else{
                url = '';
            }
            return($http(url));
        }

        //Delete the order from the order list
        orderSvc.deleteOrder = function (order) {
            var flag = 1;
            var position;
            if ($sessionStorage.orderList) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (order.id === $sessionStorage.orderList[i].id) {
                        position = i;
                    }
                }
                $sessionStorage.orderList.splice(position, 1);
            }
        };

        //Return the order list
        orderSvc.getOrder = function () {
            if ($sessionStorage.orderList) {
                return $sessionStorage.orderList;
            }
        };

        //Increase the quantity
        orderSvc.increseQuantity = function (food) {
            if (food.quantity < 5) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (food.id === $sessionStorage.orderList[i].id) {
                        $sessionStorage.orderList[i].quantity += 1;
                    }
                }
            }
        };

        //Decrease the quantity
        orderSvc.decreaseQuantity = function (food) {
            if (food.quantity > 1) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (food.id === $sessionStorage.orderList[i].id) {
                        $sessionStorage.orderList[i].quantity -= 1;
                    }
                }
            }
        };
        return orderSvc;
    }
})();