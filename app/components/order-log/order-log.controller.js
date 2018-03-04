(
    function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('OrderLogController', OrderLogController);

        OrderLogController.$inject = ['$state', '$sessionStorage'];

        function OrderLogController($state, $sessionStorage) {
            var vm = this;

        }
    }
)();