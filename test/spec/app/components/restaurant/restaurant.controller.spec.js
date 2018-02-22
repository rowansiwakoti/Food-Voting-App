(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Testing the Restaurant controller', function () {
       var _$scope, _$sessionStorage, _$state, _$controller, _$stateParams, _$uibModal, _$log, _FoodService, _RestaurantService, _OrderService, _$rootScope;
       beforeEach(inject(function ($sessionStorage, $state, $stateParams, $uibModal, $log, FoodService, RestaurantService, OrderService, $rootScope, $controller) {
           _$rootScope = $rootScope;
           _$scope = $rootScope.$new();
            _$sessionStorage = $sessionStorage;
            _$state = $state;
            _$stateParams = $stateParams;
            _$uibModal = $uibModal;
            _$log = $log;
            _FoodService = FoodService;
            _RestaurantService = RestaurantService;
            _OrderService = OrderService;

            _$controller = function () {
              return $controller('RestaurantController',{
                  $scope: _$scope
              });
            };
       }));

       describe('Testing the controller elements', function () {

           //Testing onInit function
           it('Test onInit function', function () {
               _$sessionStorage.emailId = 'dummyEmail@email.com';
               _$sessionStorage.addFoods = 'dummyFood';
               var vm = _$controller();
               vm.$onInit();
           });

           //Testing infoMsg event
           it('Test infoMsg event', function () {
               spyOn(_RestaurantService, 'getAlertMessage').and.returnValue('hello');
               var vm = _$controller();
               _$rootScope.$broadcast('infoMsg', 'dummy');
               expect(vm.infoMsg).toBe('hello');
               expect(_RestaurantService.getAlertMessage).toHaveBeenCalled();
           });
       });

    });
})();