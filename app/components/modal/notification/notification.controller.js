(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = [
        '$state',
        '$sessionStorage',
        '$uibModalInstance',
        'orderList',
        'UserService'
    ];

    function NotificationController($state, $sessionStorage, $uibModalInstance, orderList, UserService) {

        var vm = this;
        vm.orderList = orderList;
        vm.userRole = $sessionStorage.role

        vm.name = [];

        var users;

        init();
        function init(){
            UserService.getUsers().then(function (response) {

                users = response.data;

                angular.forEach(vm.orderList, function (order) {

                    angular.forEach(users, function (user) {

                        if (order.userId === user.userId) {
                            vm.name.push({firstName: user.firstName, lastName: user.lastName});
                        }

                    });

                });

            }, function (response) {

            });
        }

        vm.closeModal = function () {
            $uibModalInstance.close();
        };

        vm.gotoOrder = function () {
            $state.go('order');
            $uibModalInstance.close();
        };

        vm.orderBill = function (order) {
            $state.go('orderBill', {order: order});
            $uibModalInstance.close();
        };

        vm.individualOrder = function (order) {
            $sessionStorage.individualOrder = order;
            $uibModalInstance.close();
        };
    }
})();