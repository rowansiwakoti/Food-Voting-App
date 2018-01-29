(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = [
        '$scope',
        '$sessionStorage',
        '$uibModal',
        '$rootScope',
        '$interval',
        'APP_CONSTANT',
        'OrderService'
    ];

    function HeaderController($scope, $sessionStorage, $uibModal, $rootScope, $interval, APP_CONSTANT, OrderService) {

        var vm = this;

        vm.balance = null;
        vm.orderList = [];
        vm.orders = [];


        vm.appName = appName;
        vm.openWallet = openWallet;
        vm.openCart = openCart;
        vm.openNotification = openNotification;

        init();

        function init() {
            if ($sessionStorage.balance) {
                vm.balance = $sessionStorage.balance;
            }
            if ($sessionStorage.orderList) {
                vm.orderList = $sessionStorage.orderList;
            }
        }

        //update order list to receive
        $scope.$on('updateOrder', function (event, data) {
            vm.orders = data;
        })

        vm.$onInit = function () {
            vm.order = $sessionStorage.orderList;
            vm.role = $sessionStorage.role;
        }

        $scope.$on('updateOrdersAfterConfirm', function (data) {
            vm.order = data;
        });

        $scope.$on('instantUpdateRole', function (event, data) {
            $sessionStorage.role = data;
            vm.role = $sessionStorage.role;
            vm.orderList = $sessionStorage.orderList;
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

        function appName() {
            return APP_CONSTANT.APP_NAME;
        }

        function openNotification() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/notification/notification.html",
                controller: "NotificationController",
                controllerAs: "notificationCtrl",
                size: "sm",
                resolve: {
                    orderList: function () {
                        return vm.orders;
                    }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function openWallet() {
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
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function openCart() {
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
            modalInstance.result.then(angular.noop, angular.noop);
        }

        var date = new Date();
        date = date.toISOString().slice(0, 10);
        vm.initOrderList = function () {
            if ($sessionStorage.role === 'admin' || $sessionStorage.role === 'user') {
                OrderService.getOrderList().then(
                    function (answer) {
                        if ($sessionStorage.role === 'admin') {
                            vm.orders = answer.data;
                        }
                        else if ($sessionStorage.role === 'user') {
                            var orders = answer.data;
                            vm.orders = [];
                            angular.forEach(orders, function (order) {

                                var orderDate = new Date(order.orderedDate);
                                if (orderDate.toISOString().slice(0, 10) === date) {
                                    vm.orders.push(order);
                                }
                            });
                        }
                        $sessionStorage.orders = answer.data;
                        $rootScope.$broadcast('getOrderList', answer.data);
                    },
                    function (error) {
                    }
                );
            }
        }();

        $interval(function () {
            if ($sessionStorage.role === 'admin' || $sessionStorage.role === 'user') {
                OrderService.getOrderList().then(
                    function (answer) {
                        if ($sessionStorage.role === 'admin') {
                            vm.orders = answer.data;
                        }
                        else if ($sessionStorage.role === 'user') {
                            var orders = answer.data;
                            vm.orders = [];
                            angular.forEach(orders, function (order) {
                                var orderDate = new Date(order.orderedDate);
                                if (orderDate.toISOString().slice(0, 10) === date) {
                                    vm.orders.push(order);
                                }
                            });
                        }
                        $sessionStorage.orders = answer.data;
                        $rootScope.$broadcast('getOrderList', answer.data);
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }
        }, 30000);
    }
})();