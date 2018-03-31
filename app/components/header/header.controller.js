(function () {
  'use strict';
  angular.module('FoodOrderingApp')
    .controller('HeaderController', HeaderController);
  HeaderController.$inject = [
    '$sessionStorage',
    '$uibModal',
    '$rootScope',
    '$interval',
    'APP_CONSTANT',
    'OrderService',
    '$scope',
    '$state'
  ];

  function HeaderController($sessionStorage, $uibModal, $rootScope, $interval, APP_CONSTANT, OrderService, $scope, $state) {

    var vm = this;

    vm.balance = null;
    vm.orderList = [];
    vm.orders = [];
    vm.orderLength;


    vm.appName = appName;
    vm.checkConfirm = checkConfirm;
    vm.openWallet = openWallet;
    vm.openCart = openCart;
    vm.openNotification = openNotification;
    vm.initOrderList = initOrderList;



    //update order list to receive
    $scope.$on('updateOrder', function (event, data) {
      vm.orders = data;
      $scope.$digest();
    })

    vm.$onInit = function () {
      vm.order = $sessionStorage.orderList;
      vm.role = $sessionStorage.role;

      if ($sessionStorage.balance) {
        vm.balance = $sessionStorage.balance;
      }
      if ($sessionStorage.orderList) {
        vm.orderList = $sessionStorage.orderList;
      }
      vm.initOrderList();
    }

    $scope.$on('loggedIn', function (event) {
      if (vm.orders.length <= 0) {
        vm.initOrderList();
      }
    });

    $scope.$on('updateOrdersAfterConfirm', function (event, data) {
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

    function checkConfirm(orders) {
      return new Promise(function (resolve, reject) {
        resolve(orders.filter(function (order) {
          if (order.confirm === false) {
            return order;
          }
        }));
      });
    }

    function initOrderList() {
      if ($sessionStorage.role === 'admin') {
        vm.orders = [];
        OrderService.getOrderList().then(
          function (answer) {
            vm.call = vm.checkConfirm(answer.data);
            vm.call.then(function (data) {
              vm.orders = data;
              $scope.$digest();
              $sessionStorage.orders = answer.data;
              $rootScope.$broadcast('getOrderList', answer.data);
            });
          },
          function (error) {
          }
        );
      }
      else if ($sessionStorage.role === 'user') {
        vm.orders = [];
        OrderService.getOrderList().then(
          function (answer) {
            answer.data.forEach(function (order) {
              if (order.confirm === true) {
                vm.orders.push(order);
              }
            });
            $sessionStorage.orders = answer.data;
            $rootScope.$broadcast('getOrderList', answer.data);
          },
          function (error) {
          }
        );
      }
    }

    $interval(function () {
      vm.orderLength = vm.orders.length;
      vm.initOrderList();
      $scope.$emit('newTodayOrders');
    }, 10000);
  }
})();