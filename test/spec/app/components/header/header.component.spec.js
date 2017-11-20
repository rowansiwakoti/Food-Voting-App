"use strict";

describe("component test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("header component", function () {

        var $componentController;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));

        it("should test on header component", function () {
            expect($componentController.templateUrl).toBe("components/header/header.html");
            expect($componentController.controller).toBe("HeaderController");
        });
    });
});








