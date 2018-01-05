(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('OrderModalController', OrderModalController);
    OrderModalController.$inject = ['$uibModalInstance', '$sessionStorage', '$state', '$uibModal', '$log', '$rootScope', '$location', 'OrderService'];

    function OrderModalController($uibModalInstance, $sessionStorage, $state, $uibModal, $log, $rootScope, $location, OrderService) {

        var vm = this;
        vm.order = OrderService.getOrder();
        vm.quantity = [];

        //Checking if the quantity of the order
        vm.checkOrder = function (order, quantity) {
            console.log(order, quantity);
        };

        //Deleting an item from the order
        vm.deleteOrder = function (order) {
            OrderService.deleteOrder(order);
            vm.order = OrderService.getOrder();
        };

        //Increase the quantity
        vm.quantityIncrease = function (index, food) {
            OrderService.increseQuantity(food);
            vm.order = OrderService.getOrder();
        };

        //Decrease the quantity
        vm.quantityDecrease = function (index, food) {
            OrderService.decreaseQuantity(food);
            vm.order = OrderService.getOrder();
        };

        //Calculate the total amount
        vm.getTotal = function () {
            var total = 0;
            if (vm.order) {
                vm.order.forEach(function (order) {
                    total += order.price * order.quantity;
                });
            }
            return total;
        };

        vm.Order = function () {
            $uibModalInstance.close();
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/order/order-confirm-modal.html',
                controller: 'OrderModalController',
                controllerAs: 'orderModalCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Confirm order modal dismissed on ' + new Date());
            });
        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.OrderOk = function () {
            confirmOrder();
            $uibModalInstance.close();
            $state.go('orderhistory');
        };

        function confirmOrder() {
            var orderedItems = [];
            var totalAmount = 0;

            vm.order.forEach(function (order) {
                totalAmount += (order.quantity * order.price);
                orderedItems.push({
                    foodName: order.name,
                    foodPrice: order.price,
                    restaurantName: order.restaurantName,
                    quantity: order.quantity
                });
            });

            OrderService.confirmOrder({userId: $sessionStorage.userId, foodList: orderedItems});
            var balance = $sessionStorage.balance;
            balance -= totalAmount;
            $sessionStorage.balance = balance;
            $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
            $rootScope.$broadcast('updateOrdersAfterConfirm', vm.order);
        }

        vm.continueOrder = function () {
            var url = $location.path();
            $state.go(url);
            $uibModalInstance.dismiss();
        };
    }
})();