"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("login controller", function () {

        var $scope, $state;

        beforeEach(inject(function (_$rootScope_, $controller, _$state_) {
            $scope = _$rootScope_.$new();

            $state = _$state_;

            $controller("LoginController as loginCtrl", {
                $scope: $scope
            });

        }));
        it("should test on user login constants", function () {

            expect($scope.loginCtrl.userInputLength).toBeDefined();
            expect($scope.loginCtrl.userInputFormat).toBeDefined();

        });

        it("should call get page name", function () {

            var user = {
                username: "rowanfa",
                password: "rowanfa@123"
            };

            spyOn($scope.loginCtrl, "getPageName").and.returnValue("User Login");
            $scope.loginCtrl.getPageName();
            expect($scope.loginCtrl.getPageName).toHaveBeenCalled();
            expect($scope.loginCtrl.getPageName()).toEqual("User Login");

            spyOn($scope.loginCtrl, "validateUser").and.callThrough();
            $scope.loginCtrl.validateUser(user);
            expect($scope.loginCtrl.validateUser).toHaveBeenCalled();

        });
    });

});
