(function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('WalletController', WalletController);

        WalletController.$inject = ['$sessionStorage', 'balance', '$uibModalInstance'];

        function WalletController($sessionStorage, balance, $uibModalInstance) {

            var vm = this;
            vm.user = $sessionStorage.firstName;
            vm.balance = balance;

            vm.closeModal = function () {
                $uibModalInstance.close();
            };

        }
    })();