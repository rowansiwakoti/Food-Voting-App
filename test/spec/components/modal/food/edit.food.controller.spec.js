"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("edit food controller", function () {

        var $scope;

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();

            $controller("EditFoodController as editFoodCtrl", {

                $scope: $scope

            });

        }));

        it("should test on edit food controller", function () {

            expect(true).toBe(true);

        });
    });
});