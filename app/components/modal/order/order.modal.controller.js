(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("OrderModalController", OrderModalController);
    OrderModalController.$inject = ['$uibModalInstance', 'OrderService', '$sessionStorage', '$state', '$uibModal', '$log'];

    function OrderModalController($uibModalInstance, OrderService, $sessionStorage, $state, $uibModal, $log) {
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

        vm.confirmOrder = function () {
            $uibModalInstance.close();
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/order/order-confirm-modal.html",
                controller: "OrderModalController",
                controllerAs: "orderModalCtrl",
                size: "sm"
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info("User Logout modal dismissed on " + new Date());
            });

            // console.log(vm.order);
            //
            // var orderedItems = [];
            //
            // vm.order.forEach(function (order) {
            //     orderedItems.push({foodId: order.id, quantity: order.quantity});
            // });
            //
            // OrderService.confirmOrder({userId: $sessionStorage.userId, foodList: orderedItems});
            // $state.go('dashboard');
        };

        vm.modalCancel = function () {
            $uibModalInstance.dismiss();
        };

        vm.continueOrder = function () {
            $state.go('dashboard');
            $uibModalInstance.dismiss();
        };
    }
})();