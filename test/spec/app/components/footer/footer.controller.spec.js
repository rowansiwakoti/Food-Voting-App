"use strict";

describe("controller test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("footer controller", function () {

        var $scope;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();

            $controller("FooterController as footerCtrl", {
                $scope: $scope
            });
        }));

        it("should test getAppName function", function () {

            spyOn($scope.footerCtrl, "getAppName").and.returnValue("Food Voting App");
            $scope.footerCtrl.getAppName();
            expect($scope.footerCtrl.getAppName).toHaveBeenCalled();
            expect($scope.footerCtrl.getAppName()).toEqual("Food Voting App");

        });

    });

});