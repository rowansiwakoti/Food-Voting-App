(
    function () {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('TodayController', TodayController);

        TodayController.$inject = ['$sessionStorage'];

        function TodayController($sessionStorage) {
                var vm = this;

                vm.orders= $sessionStorage.orders;
                console.log(vm.orders);
        }
    }
)();