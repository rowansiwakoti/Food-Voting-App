(
    function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('OrderListController', OrderListController);

        OrderListController.$inject = ['$state', '$sessionStorage', 'OrderService', '$stateParams', '$scope'];

        function OrderListController($state, $sessionStorage, OrderService, $stateParams, $rootScope, $scope) {
            if($sessionStorage.role == 'admin'){
                var vm = this;
                vm.orderList = $sessionStorage.orders;console.log($sessionStorage.orders)
                vm.index = -1;
                vm.orderFoods = [];

                $rootScope.$on('getOrderList', function (event, data) {
                    vm.orderList = data;
                    $sessionStorage.orders = vm.orderList;
                });

                vm.recieveOrder = function (id) {
                    var confirm = OrderService.receiveOrder(id);
                    confirm.then(
                        function (answer) {
                            vm.updateList(id);
                        },
                        function (error) {
                            console.log(error);
                        }
                    )
                }

                vm.updateList = function (id) {
                    var pos = 0;
                    vm.orderList.forEach(function (order, index) {
                        if(order.orderId == id){
                            pos = index;
                        }
                    });
                    vm.orderList.splice(pos,1);
                    $sessionStorage.orders = vm.orders;
                    $rootScope.$broadcast('update order',vm.orderList);
                }

            }
        }
    }
)();