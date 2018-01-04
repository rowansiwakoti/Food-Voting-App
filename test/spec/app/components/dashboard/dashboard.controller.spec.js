"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("dashboard controller", function () {

        var $scope, APP_CONSTANT;

        beforeEach(inject(function ($rootScope, $controller, _APP_CONSTANT_) {

            $scope = $rootScope.$new();
            APP_CONSTANT = _APP_CONSTANT_;

            $controller("DashboardController as dashboardCtrl", {
                $scope: $scope
            });

        }));

        it("should test the page constants and variables", function () {
            expect($scope.dashboardCtrl.noFoodMsg).toBeDefined();
            expect($scope.dashboardCtrl.foodItems).toBeDefined();
            expect($scope.dashboardCtrl.message).toBeDefined();
        });

    });

});

