(function () {
    'use strict';

    angular.module("FoodOrderingApp").controller("OrderController", OrderController);

    OrderController.$inject = [
        '$stateParams',
        '$sessionStorage',
        '$rootScope',
        '$state',
        'UserService',
        'OrderService'
    ];

    function OrderController($stateParams, $sessionStorage, $rootScope, $state, UserService, OrderService) {

        var vm = this;
        vm.userId = $stateParams.id;
        vm.userOrder = $sessionStorage.individualOrder;
        vm.orderList = $sessionStorage.orders;
console.log(vm.userOrder);
vm.foodList = vm.userOrder.foodList;
        vm.$onInit = function () {
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }
            if ($sessionStorage.fullName) {
                vm.fullName = $sessionStorage.fullName;
            }
        }


        /*UserService.getUsers().then(function (success) {
            angular.forEach(success.data, function (data) {
                if (vm.userOrder) {
                    if (data.userId === vm.userOrder.userId) {
                        {
                            vm.fullName = data.firstName + ' ' + data.lastName;
                            $sessionStorage.fullName = vm.fullName;
                        }
                        vm.foodList = vm.userOrder.foodResList;
                    }
                }
            });
        }, function (error) {

        });*/

        vm.receiveOrder = function (id) {
            var test = OrderService.receiveOrder(id);
            test.then(
                function (answer) {
                    vm.updateList(id);
                },
                function (error) {

                }
            );
        }

        vm.updateList = function (id) {
            var pos = 0;
            vm.foodList = '';
            $sessionStorage.individualOrder = null;
            angular.forEach(vm.orderList, function (order, index) {
                if (order.orderId === id) {
                    pos = index;
                }
            });
            vm.orderList.splice(pos, 1);
            $rootScope.$broadcast('updateOrder', vm.orderList);
        };
    }

})();


