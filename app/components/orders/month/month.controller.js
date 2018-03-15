(function () {
    'use strict';

    angular.module('FoodOrderingApp.Orders')
        .controller('MonthController', MonthController);

    MonthController.$inject = ['$sessionStorage', '$state', 'OrderService', 'UserService'];

    function MonthController($sessionStorage, $state, OrderService, UserService) {
        var vm = this;

        vm.orders = [];

        vm.role = $sessionStorage.role;

        vm.generateBill = generateBill;

        vm.$onInit = function () {
            var orders = OrderService.getMonthsOrderList();

            orders.then(
                function (response) {
                    response.data.forEach(function (order) {
                        if (order.confirm === true) {
                            vm.orders.push(order);
                        }
                    });
                },
                function (error) {
                }
            );

        };

        function generateBill(order){
            if(vm.role === 'user'){
                $sessionStorage.orderBill = order;
                $state.go('orderBill', {order: order});
            }
        }
    }
})();