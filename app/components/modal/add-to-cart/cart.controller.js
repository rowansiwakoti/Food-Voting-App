(function () {
        'use strict';
        angular.module('FoodOrderingApp')
            .controller('CartController', CartController);
        CartController.$inject = ['order', '$uibModalInstance', 'OrderService'];

        function CartController(order, $uibModalInstance, OrderService) {
            var vm = this;
            vm.order = order;
            vm.count = 1;

            vm.totalAmount = function () {
                vm.amount = vm.count * vm.order.price;
            };
            vm.totalAmount();

            vm.increaseOrder = function () {
                if (vm.count < 5) {
                    ++vm.count;
                    vm.totalAmount();
                    vm.orderUpdate();
                }
            };

            vm.decreaseOrder = function () {
                if (vm.count > 1) {
                    --vm.count;
                    vm.totalAmount();
                    vm.orderUpdate();
                }
            };

            vm.addToCart = function () {
                OrderService.addOrder(vm.order);
                $uibModalInstance.close();
            };

            vm.orderUpdate = function () {
                vm.order.quantity = vm.count;
            };
            vm.orderUpdate();

            vm.modalCancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    })();