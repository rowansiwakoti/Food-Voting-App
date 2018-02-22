"use strict";

describe("controller test", function () {

    beforeEach(module("FoodOrderingApp"));

    describe("footer controller", function () {

        var _$scope, _$controller, _APP_CONSTANT;

        beforeEach(inject(function (APP_CONSTANT, $rootScope, $controller) {
            _$scope = $rootScope.$new();
            _APP_CONSTANT = APP_CONSTANT;

            _$controller = function () {
                return $controller("FooterController as footerCtrl", {
                    $scope: _$scope
                });
            };
        }));

        describe('Testing Controller Components',function () {
            //Test appName
            it('testing appName', function () {
                var vm = _$controller();
                var name = vm.appName();
                expect(name).toBe('Food Ordering App');
            });
        });

    });

});