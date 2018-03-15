(function () {
    'use strict';

    angular.module('FoodOrderingApp.Orders')
        .controller('TodayController', TodayController);

    TodayController.$inject = ['$sessionStorage', '$state', 'OrderService'];

    function TodayController($sessionStorage, $state, OrderService) {
        var vm = this;

        vm.orders = [];

        vm.role = $sessionStorage.role;

        vm.acceptOrder = acceptOrder;
        vm.generateBill = generateBill;

        vm.$onInit = function () {
            OrderService.getOrderList()
                .then(
                    function (response) {
                        if (response.data) {
                            vm.orders = response.data;
                            vm.orders.forEach(function (order) {
                               order.total = vm.add(order.foodResList);
                            });
                        }
                    },
                    function (error) {

                    }
                );
        };

        vm.add = function(orders) {
            var total = 0;
            orders.forEach(function (order) {
                total += order.foodPrice * order.quantity;
            });
            return total;
        }

        function acceptOrder(orderId) {
            OrderService.receiveOrder(orderId).then(function (response) {
                // $state.reload();
                if(vm.orders.length >0){

                    angular.forEach(vm.orders, function(order, index){
                        if(order.orderId === orderId){
                            vm.orders.splice(index, 1);
                        }
                    });
                }
            }, function (error) {

            });
        }

        function generateBill(order){
            if(vm.role === 'user'){
                $sessionStorage.orderBill = order;
                $state.go('orderBill', {order: order});
            }
        }
    }
})();