(
    function () {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('TodayController', TodayController);

        TodayController.$inject = ['$sessionStorage', 'OrderService'];

        function TodayController($sessionStorage, OrderService) {
                var vm = this;
                vm.orders = [];

                var call = OrderService.getOrderList();

                call.then(
                    function (response) {
                        vm.orders = response.data;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }
    }
)();