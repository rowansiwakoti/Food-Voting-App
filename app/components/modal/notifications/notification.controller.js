(
    function () {
        'use strict';
        angular.module('FoodOrderingApp')
            .controller('NotificationController', NotificationController);

        NotificationController.$inject = ['$state', '$sessionStorage', '$uibModalInstance', 'orderList'];

        function NotificationController($state, $sessionStorage, $uibModalInstance, orderList) {
            var vm = this;
            vm.orderList = orderList;

            vm.closeModal = function(){
                console.log('close modal');
                $uibModalInstance.close();
            };

            vm.gotoOrder = function () {
                $uibModalInstance.close();
            }
        }
    }
)();