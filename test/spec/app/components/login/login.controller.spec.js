"use strict";

describe("controller", function () {

    beforeEach(module("FoodOrderingApp"));

    describe("login controller", function () {

        var $scope, $state;

        beforeEach(inject(function (_$rootScope_, $controller, _$state_) {
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $controller("LoginController as loginCtrl", {
                $scope: $scope
            });
        }));

        it("")



    });

});
