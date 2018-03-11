(
    function () {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('MonthController', MonthController);

        MonthController.$inject = ['OrderService'];

        function MonthController(OrderService) {
                var vm = this;

                vm.orders = [];

                vm.$onInit = function(){
                    var orders = OrderService.getmonthsOrderList();

                    orders.then(
                        function (response) {
                            response.data.forEach(function (order) {
                                var date = new Date(order.orderedDate).toDateString().slice(4,10);
                                order.orderedDate = date;
                                if(order.confirm === true){
                                    vm.orders.push(order);
                                }
                            });
                        },
                        function (error) {
                            console.log(error);
                        }
                    );
                };
        }
    }
)();