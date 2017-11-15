"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("login controller", function () {

        var $scope, _$state;

        beforeEach(inject(function ($rootScope, $state, $controller) {
            $scope = $rootScope.$new();
            _$state = $state;

            $controller("LoginController as login", {
                $scope: $scope,
                $state: _$state
            });

        }));

        it("should test on user login page", function () {
            expect($state.current.name).toBe("login");
            // expect($scope.login.getPageName()).toBe("User Login");
            // spyOn(controller, "validateUser");
            // expect(controller.validateUser).not.toHaveBeenCalled();
            // controller.init();
            // expect(controller.validateUser).toHaveBeenCalled();
        });

    });

});