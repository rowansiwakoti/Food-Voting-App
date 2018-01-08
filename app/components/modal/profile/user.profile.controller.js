(
    function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .controller('UserProfileController', UserProfileController);

        UserProfileController.$inject = ['$sessionStorage', 'balance', '$uibModalInstance','$uibModal', 'RestaurantService', 'OrderService', '$log'];

        function UserProfileController($sessionStorage, balance, $uibModalInstance,$uibModal, RestaurantService, OrderService, $log) {
            var vm = this;
            vm.user = $sessionStorage.firstName;
            vm.balance = balance;

            vm.closeModal = function(){
                $uibModalInstance.close();
            }

            vm.userLogout = function () {
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
                    OrderService.initOrder();
                }, function () {
                    $log.info('User Logout modal dismissed on ' + new Date());
                });
            };
        }
    }
)();