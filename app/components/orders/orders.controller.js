(
    function () {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('OrdersController', TodaysOrdersController);

        TodaysOrdersController.$inject = ['$state'];

        function TodaysOrdersController($state) {
                var vm = this;
                
                vm.monthsOrder = monthsOrder;
                vm.todaysOrder = todaysOrder;
                
                function monthsOrder() {console.log('goto months order');
                    $state.go('orders.month');
                }
                
                function todaysOrder() { console.log('goto months order');
                    $state.go('orders.today');
                }
        }
    }
)();