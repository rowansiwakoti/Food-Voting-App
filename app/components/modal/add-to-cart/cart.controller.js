(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('CartController', CartController);
    CartController.$inject = ['$uibModalInstance', 'order', 'OrderService', 'APP_CONSTANT'];

    function CartController($uibModalInstance, order, OrderService, APP_CONSTANT) {

        var vm = this;
        vm.order = order;
        vm.count = 1;

        vm.totalAmount = function () {
            vm.amount = vm.count * vm.order.price;
        };
        vm.totalAmount();

        vm.increaseOrder = function () {
            if (vm.count < APP_CONSTANT.MAX_ORDERS) {
                ++vm.count;
                vm.totalAmount();
                vm.orderUpdate();
            }
        };

        vm.decreaseOrder = function () {
            if (vm.count > APP_CONSTANT.MIN_ORDERS) {
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