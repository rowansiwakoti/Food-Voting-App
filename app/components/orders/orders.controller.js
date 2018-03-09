(function () {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('OrdersController', TodaysOrdersController);

        TodaysOrdersController.$inject = ['$state', '$location'];

        function TodaysOrdersController($state, $location) {
            var vm = this;

            vm.monthsOrder = monthsOrder;
            vm.todaysOrder = todaysOrder;

            vm.$onInit = function () {
                if ($location.path() === '/orders/month') {
                    vm.month = true;
                }
                else {
                    vm.today = true;
                }
            }

            function monthsOrder() {
                $state.go('orders.month');
            }

            function todaysOrder() {
                $state.go('orders.today');

            }
        }
    })();