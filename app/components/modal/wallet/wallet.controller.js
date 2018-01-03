(
    function () {
        'use strict';

        angular.module('FoodVotingApp')
            .controller('WalletController',WalletController);

        WalletController.$inject = ['$sessionStorage', 'balance', '$uibModalInstance'];

        function WalletController($sessionStorage,balance, $uibModalInstance) {
            var vm = this;
            vm.user = $sessionStorage.firstName;
            vm.balance = balance;
            console.log(vm.user);

            vm.closeModal = function () {
                $uibModalInstance.close();
            }

        }
    }
)();