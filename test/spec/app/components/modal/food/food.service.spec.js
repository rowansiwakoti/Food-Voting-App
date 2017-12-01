"use strict";

describe("service test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("food service", function () {

        var FoodService;

        beforeEach(inject(function (_FoodService_) {

            FoodService = _FoodService_;

        }));

        it("should define service methods", function () {

            expect(FoodService.setFood).toBeDefined();
            expect(FoodService.getFood).toBeDefined();
            expect(FoodService.getFoodList).toBeDefined();
            expect(FoodService.setAlertMessage).toBeDefined();
            expect(FoodService.getAlertMessage).toBeDefined();

        });

    });
});