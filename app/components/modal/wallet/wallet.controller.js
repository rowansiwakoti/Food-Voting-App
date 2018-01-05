(function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('WalletController', WalletController);

        WalletController.$inject = ['$sessionStorage', '$uibModalInstance', 'balance'];

        function WalletController($sessionStorage, $uibModalInstance, balance) {

            var vm = this;
            vm.user = $sessionStorage.firstName;
            vm.balance = balance;

            vm.closeModal = function () {
                $uibModalInstance.close();
            };

        }
    })();