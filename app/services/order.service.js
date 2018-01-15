(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$sessionStorage', '$http', '$rootScope', '$interval'];

    function OrderService($sessionStorage, $http, $rootScope, $interval) {

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

            // set flag to zero // ignores duplicate order
            if ($sessionStorage.orderList) {
                $sessionStorage.orderList.forEach(function (item) {
                    if (item.id === order.id) {
                        flag = 0;
                    }
                });
            }

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
            }
            $rootScope.$broadcast('updateOrders', orderList);
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
            console.log(order)
        };

        orderSvc.getLog = function (role,id) {
            var url;
            if(role === 'admin'){
                url = '';
            }
            else{
                url = '';
            }
            return($http(url));
        };

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

        $sessionStorage.orderList = orderSvc.orderList;

        var order;
        var tempOrder = [];

        orderSvc.getOrderList = function () {
                if($sessionStorage.role == 'admin'){
                    return ($http.get('http://localhost:8080/order'));
                }
                else if($sessionStorage.role == 'user'){
                    return ($http.get('http://localhost:8080/user/userList/'+$sessionStorage.userId));
                }

        };

        orderSvc.receiveOrder = function (id) {
            return($http.put('http://localhost:8080/order/'+id));
            console.log('receive this order', id)
        }

        return orderSvc;
    }
})();





// orderSvc.orderList = [
//     {
//         user:'Rowan',
//         foods:[
//             {
//                 name:'Chicken Momo',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             },
//             {
//                 name:'Chicken Momoa',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             },
//             {
//                 name:'Chicken Momos',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             }
//         ]
//     },
//     {
//         user:'Nitish',
//         foods:[
//             {
//                 name:'Chicken Momo',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             },
//             {
//                 name:'Chicken Momo',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             },
//             {
//                 name:'Chicken Momo',
//                 restaurant:'Bota',
//                 price:150,
//                 quantity:2
//             }
//         ]
//     }
//
// ];