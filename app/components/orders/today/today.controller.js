(function () {
  'use strict';

  angular.module('FoodOrderingApp.Orders')
    .controller('TodayController', TodayController);

  TodayController.$inject = ['$sessionStorage', '$state', 'OrderService', '$rootScope'];

  function TodayController($sessionStorage, $state, OrderService, $rootScope) {
    var vm = this;

    vm.orders = [];

    vm.role = $sessionStorage.role;

    vm.acceptOrder = acceptOrder;
    vm.generateBill = generateBill;
    vm.checkConfirm = checkConfirm;

    vm.$onInit = function () {
      OrderService.getOrderList()
        .then(
          function (response) {
            if (response.data) {
              vm.orders = response.data;
              vm.orders.forEach(function (order) {
                order.total = vm.add(order.foodResList);
              });
            }
          },
          function (error) {

          }
        );
    };

    vm.add = function (orders) {
      var total = 0;
      orders.forEach(function (order) {
        total += order.foodPrice * order.quantity;
      });
      return total;
    }

    function checkConfirm(orders) {
      return new Promise(function (resolve, reject) {
        resolve(orders.filter(function (order) {
          if (order.confirm === false) {
            console.log(order)
            return order;
          }
        }));
      });
    }

    function accept(orderId) {
      return new Promise(function (resolve, reject) {
        angular.forEach(vm.orders, function (order, index) {
          if (order.orderId === orderId) {
            order.confirm = true;
            resolve(true);
          }
        });
      });
    }

    function acceptOrder(orderId) {
      OrderService.receiveOrder(orderId).then(function (response) {
        if (vm.orders.length > 0) {
          var callAccept = accept(orderId);
          callAccept.then(function (data) {
            var call = checkConfirm(vm.orders);
            call.then(function (data) {
              $rootScope.$broadcast('updateOrder', data);
            });
          });
        }
      }, function (error) {
        console.log(error);
      });
    }

    function generateBill(order) {
      if (vm.role === 'user') {
        $sessionStorage.orderBill = order;
        $state.go('orderBill', {order: order});
      }
    }
  }
})();