"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("food controller", function () {

        var $scope, $uibModalInstance;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            $uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

            $controller("FoodController as foodCtrl", {
                $scope: $scope,
                $uibModalInstance: $uibModalInstance
            });
        }));

        it("should define the page constants", function () {
            expect($scope.foodCtrl.foodNameReqMsg).toBeDefined();
            expect($scope.foodCtrl.foodPriceReqMsg).toBeDefined();
            expect($scope.foodCtrl.resNameReqMsg).toBeDefined();
            expect($scope.foodCtrl.numbersOnlyMsg).toBeDefined();
        });

        it("should let user dismiss the modal", function () {
            expect($scope.foodCtrl.cancel).toBeDefined();
            $scope.foodCtrl.cancel();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();
        });

        it("should let the user confirm the modal", function () {
            expect($scope.foodCtrl.ok).toBeDefined();
            expect($uibModalInstance.close).not.toHaveBeenCalled();
        });

    });

})