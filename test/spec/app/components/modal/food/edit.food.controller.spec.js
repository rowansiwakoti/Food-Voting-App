"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("edit food controller", function () {

        var $scope, $uibModalInstance;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            $uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);
            $controller("EditFoodController as editFoodCtrl", {
                $scope: $scope,
                $uibModalInstance: $uibModalInstance
            });
        }));

        it("should define the page constants", function () {
            expect($scope.editFoodCtrl.foodNameReqMsg).toBeDefined();
            expect($scope.editFoodCtrl.foodPriceReqMsg).toBeDefined();
            expect($scope.editFoodCtrl.numbersOnlyMsg).toBeDefined();
        });

        it("should define the page variables", function () {
            expect($scope.editFoodCtrl.food).toBeDefined();
            expect($scope.editFoodCtrl.restaurant).toBeDefined();
            expect($scope.editFoodCtrl.foodDuplicate).toBeDefined();
            expect($scope.editFoodCtrl.restaurantDuplicate).toBeDefined();
        });

        it("should let user dismiss the modal", function () {
            expect($scope.editFoodCtrl.cancel).toBeDefined();
            $scope.editFoodCtrl.cancel();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();
        });

        it("should let the user confirm the modal", function () {
            expect($scope.editFoodCtrl.ok).toBeDefined();
            expect($uibModalInstance.close).not.toHaveBeenCalled();
        });
    });
});