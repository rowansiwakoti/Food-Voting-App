(function () {
    "use strict";
    angular.module("FoodOrderingApp")
        .controller("HeaderController", HeaderController);
    HeaderController.$inject = ["$scope", "APP_CONSTANT", "$sessionStorage", "$state", "OrderService", "$uibModal", '$interval', '$rootScope'];

    function HeaderController($scope, APP_CONSTANT, $sessionStorage, $state, OrderService, $uibModal, $interval, $rootScope) {

        var vm = this;

        vm.balance = null;
        vm.orderList = [];
        vm.orders = [];

        //Setting balance
        if ($sessionStorage.balance) {
            vm.balance = $sessionStorage.balance;
        }
        if($sessionStorage.orderList){console.log('m here')
            vm.orderList = $sessionStorage.orderList;
        }
        //updateOrdersInCart
        $scope.$on('updateOrdersAfterConfirm', function (data) {
            vm.order = data;
        });
        //update order list to receive
        $scope.$on('updateOrder',function (event,data) {
            vm.orders = data
        })

        var appName = APP_CONSTANT.APP_NAME;

        function activateController() {
            vm.order = $sessionStorage.orderList;
            vm.role = $sessionStorage.role;
        }

        activateController();

        $scope.$on("instantUpdateRole", function (event, data) {
            $sessionStorage.role = data;
            vm.role = $sessionStorage.role;
            vm.orderList = $sessionStorage.orderList;
            console.log(vm.role, $sessionStorage.order);
        });



        // $scope.$on('updateBalanceInWallet', function (event, userBalance) {
        //     vm.balance = userBalance;
        //     console.log(userBalance);
        // });

        $scope.$on('instantUpdateBalance', function (event, data) {
            console.log(data)
            vm.balance = $sessionStorage.balance;
        })

        $scope.$on("clearRole", function (event, data) {
            vm.role = data;
            $sessionStorage.orderList = [];
            console.log($sessionStorage.orderList);
        });


        $scope.$on("updateOrders", function (event, data) {
            vm.order = data;
        });

        vm.getAppName = function () {
            return appName;
        };

        vm.openNotification = function(){console.log('open components')
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/notifications/notification.html",
                controller: "NotificationController",
                controllerAs: "notificationCtrl",
                size: "sm",
                resolve: {
                    orderList: function () {
                        return vm.orders;
                    }
                }
            });
            modalInstance.result.then(
                function () {

                },
                function () {

                }
            );
        };

        vm.openWallet = function () {
            console.log('Open Wallet', vm.balance);
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/user/user.modal.html",
                controller: "UserModalController",
                controllerAs: "userCtrl",
                size: "sm",
                resolve: {
                    balance: function () {
                        return vm.balance;
                    }
                }
            });
            modalInstance.result.then(
                function () {

                },
                function () {

                }
            );
        };

        vm.openCart = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/order/order-cart.html",
                controller: "OrderModalController",
                controllerAs: "orderModalCtrl",
                size: "lg"
            });

            modalInstance.result.then(function () {

            }, function () {

            });
        };

        vm.initOrderList = function () {
            var order = OrderService.getOrderList();
            order.then(
                function (answer) {
                    vm.orders = answer.data;
                    $sessionStorage.orders = answer.data;
                    $rootScope.$broadcast('getOrderList', answer.data);
                },
                function (error) {
                    console.log(error)
                }
            )
        }();

        $interval(function () {
            if($sessionStorage.role == 'admin'){
                var order = OrderService.getOrderList();
                order.then(
                    function (answer) {
                        vm.orders = answer.data;
                        $sessionStorage.orders = answer.data;
                        $rootScope.$broadcast('getOrderList', answer.data);
                    },
                    function (error) {
                        console.log(error)
                    }
                )
            }
        },30000);

    }
})();