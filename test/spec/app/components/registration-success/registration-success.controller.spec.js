(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Registration Success Controller',function () {
        var _$scope, _$controller, _$state;

        beforeEach(inject(function ($rootScope, $controller, $state) {
            _$scope = $rootScope.$new();
            _$state = $state;
            _$controller = function () {
              return $controller('RegistrationSuccessController',{
                  $scope: _$scope
              });
            };
        }));

        describe('Testing controller components',function () {
            //Check gotoLogin function
            it('Check gotoLogin function',function () {
                spyOn(_$state,'go').and.callThrough();
                var vm = _$controller();
                vm.gotoLogin();
                expect(_$state.go).toHaveBeenCalled();
            });
        });
    });
})();