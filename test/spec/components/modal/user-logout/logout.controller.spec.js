"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("logout controller", function () {

        var $scope;

        beforeEach(inject(function ($rootScope, $controller) {

            $scope: $scope;

            $controller("LogoutController as logoutCtrl", {

                $scope: $scope

            });

        }));

        it("should test on logout controller", function () {

            expect(true).toBe(true);

        });

    });

});