(function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('UserProfileController', UserProfileController);

        UserProfileController.$inject = [
            '$sessionStorage',
            'balance',
            '$uibModalInstance',
            '$uibModal',
            'RestaurantService',
            'OrderService',
            '$log'
        ];

        function UserProfileController($sessionStorage, balance, $uibModalInstance, $uibModal, RestaurantService, OrderService, $log) {
            var vm = this;
            vm.name = $sessionStorage.firstName;
            vm.user = $sessionStorage.role;
            vm.balance = balance;

            vm.closeModal = closeModal;
            vm.userLogout = userLogout;

            function closeModal() {
                $uibModalInstance.close();
            }

            function userLogout() {
                vm.closeModal();
                vm.message = "";
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: false,
                    templateUrl: 'components/modal/logout/logout.html',
                    controller: 'LogoutController',
                    controllerAs: 'logoutCtrl',
                    size: 'sm'
                });
                modalInstance.result.then(function () {
                    vm.message = RestaurantService.getAlertMessage();
                }, function () {
                    $log.info('User Logout modal dismissed on ' + new Date());
                });
            }
        }
    })();