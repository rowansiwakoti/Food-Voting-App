"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("delete food controller", function () {

        var $scope, $uibModalInstance, foodParam;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();

            foodParam =
                {
                    name: "MoMo",
                    restaurant: "Bota MoMo",
                    price: 160
                };


            $uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

            $controller("DeleteFoodController as deleteFoodCtrl", {
                $scope: $scope,
                foodParam: foodParam,
                $uibModalInstance: $uibModalInstance
            });
        }));

        it("should define the page constants", function () {

            expect($scope.deleteFoodCtrl.delFoodMsg).toBeDefined();

        });

        it("should let user dismiss the modal", function () {
            expect($scope.deleteFoodCtrl.cancel).toBeDefined();
            $scope.deleteFoodCtrl.cancel();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();
        });

        it("should let the user confirm the modal", function () {
            expect($scope.deleteFoodCtrl.ok).toBeDefined();
            $scope.deleteFoodCtrl.ok();
            expect($uibModalInstance.close).toHaveBeenCalled();
        });

    });

});