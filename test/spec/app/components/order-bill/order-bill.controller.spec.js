(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Checking Order Bill Controller', function () {
        var _$sessionStorage, _$state, _$stateParams, _$scope, _$controller;
        beforeEach(inject(function ($sessionStorage, $state, $stateParams, $rootScope, $controller) {
            _$scope = $rootScope.$new();
            _$sessionStorage = $sessionStorage;
            _$state = $state;
            _$stateParams = $stateParams;

            _$controller = function () {
                return $controller('OrderBillController', {
                    $scope: _$scope
                });
            };
        }));

        describe('Testing Controller components', function () {
            //Basic test
            it('sfsfsaf',function () {
                var vm = _$controller();
                expect(true).toBeTruthy();
            });
        });
    });
})();