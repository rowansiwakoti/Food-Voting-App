(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('OrderListController', OrderListController);

    OrderListController.$inject = ['$sessionStorage', 'OrderService', '$rootScope', '$state', 'UserService'];

    function OrderListController($sessionStorage, OrderService, $rootScope, $state, UserService) {

        init();

        function init() {

            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }
        }

        if ($sessionStorage.role === 'admin') {
            var vm = this;
            vm.orderList = $sessionStorage.orders;
            vm.index = -1;
            vm.orderFoods = [];

            var userFoods = [];

            if (vm.orderList) {
                angular.forEach(vm.orderList, function (order) {
                    // var userOrders
                    userFoods.push({orderId: order.orderId, orderList: order.foodResList});
                });
                // console.log(userFoods);
            }

            vm.userOrderList = [];

            if (vm.orderList) {
                if (userFoods) {
                    angular.forEach(userFoods, function (userFood) {
                        angular.forEach(vm.orderList, function (order) {
                            if (userFood.orderId === order.orderId) {
                                vm.userOrderList.push(userFood.orderList);
                            }
                        });
                    });
                }
            }


            if (vm.orderList) {
                var users;
                UserService.getUsers().then(function (response) {
                    users = response.data;
                    angular.forEach(vm.orderList, function (order) {

                        angular.forEach(users, function (user) {
                            if (order.userId === user.userId) {
                                var middleName = user.middleName || '';
                                vm.fullName = user.firstName + ' ' + middleName + ' ' + user.lastName;
                            }
                        });

                    });
                }, function (error) {

                });
            }

            $rootScope.$on('getOrderList', function (event, data) {
                vm.orderList = data;
                vm.receiveOrder = function (id) {
                    // console.log(id);
                    var test = OrderService.receiveOrder(id);
                    test.then(
                        function (answer) {
                            vm.updateList(id);
                        },
                        function (error) {

                        }
                    );
                }
                console.log(vm.orderList);

                vm.updateList = function (id) {
                    var pos = 0;
                    vm.orderList.forEach(function (order, index) {
                        if (order.orderId === id) {
                            pos = index;
                        }
                    });
                    vm.orderList.splice(pos, 1);
                    $sessionStorage.orders = vm.orders;
                    $rootScope.$broadcast('updateOrder', vm.orderList);
                };                $sessionStorage.orders = vm.orderList;
            });



        }
    }
})();