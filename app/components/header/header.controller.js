(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$scope', '$sessionStorage', '$uibModal', '$log', 'APP_CONSTANT'];

    function HeaderController($scope, $sessionStorage, $uibModal, $log, APP_CONSTANT) {

        var vm = this;

        vm.balance = null;
        vm.order = $sessionStorage.orderList;
        vm.role = $sessionStorage.role;
        var appName = APP_CONSTANT.APP_NAME;

        init();

        function init() {
            if ($sessionStorage.balance) {
                vm.balance = $sessionStorage.balance;
            }
        }

        $scope.$on('updateOrdersAfterConfirm', function (data) {
            vm.order = data;
        });

        $scope.$on('instantUpdateRole', function (event, data) {
            $sessionStorage.role = data;
            vm.role = $sessionStorage.role;
            vm.order = $sessionStorage.orderList;
        });

        $scope.$on('instantUpdateBalance', function (event, data) {
            vm.balance = data;
        });

        $scope.$on('clearRole', function (event, data) {
            vm.role = data;
            $sessionStorage.orderList = [];
        });

        $scope.$on('updateOrders', function (event, data) {
            vm.order = data;
        });

        vm.getAppName = function () {
            return appName;
        };

        vm.openWallet = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: "components/modal/profile/user-profile.modal.html",
                controller: "UserProfileController",
                controllerAs: "userProfileCtrl",
                size: 'sm',
                resolve: {
                    balance: function () {
                        return vm.balance;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    $log.info('User profile modal closed on ' + new Date());
                },
                function () {
                    $log.info('User profile modal dismissed on ' + new Date());
                }
            );
        };

        vm.openCart = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/order/order-cart.html',
                controller: 'OrderModalController',
                controllerAs: 'orderModalCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $log.info('Cart modal closed on ' + new Date());
            }, function () {
                $log.info('Cart modal dismissed on ' + new Date());
            });
        };
    }
})();