"use strict";

describe("controller test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("header controller", function () {

        var $scope;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();

            $controller("HeaderController as headerCtrl", {
                $scope: $scope
            });
        }));

        it("should test getAppName function", function () {

            spyOn($scope.headerCtrl, "getAppName").and.returnValue("Food Voting App");
            $scope.headerCtrl.getAppName();
            expect($scope.headerCtrl.getAppName).toHaveBeenCalled();
            expect($scope.headerCtrl.getAppName()).toEqual("Food Voting App");

        });

    });

});