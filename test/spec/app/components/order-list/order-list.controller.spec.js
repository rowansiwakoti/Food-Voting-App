(
    function () {
        'use strict';

        beforeEach(module('FoodOrderingApp'));

        describe('Testing Order-List Controller', function () {
           var _$scope, _$controller, _$sessionStorage, _OrderService, _$state, _UserService ;

           beforeEach(inject(function ($sessionStorage, OrderService, $rootScope, $state, UserService, $controller) {
               _$scope = $rootScope.$new();
               _$sessionStorage = $sessionStorage;
               _OrderService = OrderService;
               _$state = $state;
               _UserService = UserService;
               _$controller = function () {
                   return $controller('OrderListController', {
                        $scope: _$scope
                   });
               };
           }));

           describe('Testing Controller Components', function () {
              it('sdafsdf', function () {
                  _$sessionStorage.role = 'admin';
                  var vm = _$controller();
                  expect(vm.index).toBe(-1);
              }) ;
           });
        });
    }
)();