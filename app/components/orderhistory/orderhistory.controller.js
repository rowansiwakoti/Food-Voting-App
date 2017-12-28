(
    function () {
        'use strict';
        angular.module('FoodVotingApp')
            .controller('OrderHistoryController',OrderHistoryController);

        OrderHistoryController.$inject = ['$state', '$sessionStorage'];

        function OrderHistoryController($state,$sessionStorage) {
            var vm = this;

            vm.items = $sessionStorage.orderList;
            vm.total = 0;

            vm.items.forEach(function (item) {
                vm.total += item.price * item.quantity;
            });

            $sessionStorage.orderList = [];
        }

    }
)();