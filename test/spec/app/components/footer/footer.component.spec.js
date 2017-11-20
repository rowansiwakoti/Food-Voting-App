"use strict";

describe("component test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("footer component", function () {

        var $componentController;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));

        it("should test on footer component", function () {
            expect($componentController.templateUrl).toBe("components/footer/footer.html");
            expect($componentController.controller).toBe("FooterController");

        });

    });

});