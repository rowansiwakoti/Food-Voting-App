(function () {
    "use strict";
    describe('OrderBillController', function () {

        var _$scope, _$sessionStorage, _$state, _$stateParams, _$controller;

        beforeEach(module('FoodOrderingApp'));

        beforeEach(inject(function ($rootScope, $sessionStorage, $state, $stateParams, $controller) {

            _$scope = $rootScope.$new();
            _$sessionStorage = $sessionStorage;
            _$state = $state;
            _$stateParams = $stateParams;

            _$controller = $controller('OrderBillController', {
                $scope: _$scope,
                $sessionStorage: _$sessionStorage,
                $state: _$state
            });

        }));

        it('should call $onInit method. when emailId is undefined', function () {
            _$sessionStorage.emailId = '';
            spyOn(_$state, 'go');
            expect(_$state.go).not.toHaveBeenCalled();
            _$state.go();
            expect(_$state.go).toHaveBeenCalled();
        });

        it('should call $onInit method. when a user\'s order is received by an admin', function () {
            _$sessionStorage.userOrders = [{}];
            spyOn(_$state, 'go');
            expect(_$state.go).not.toHaveBeenCalled();
            _$state.go();
            expect(_$state.go).toHaveBeenCalled();
        });

    });
})();