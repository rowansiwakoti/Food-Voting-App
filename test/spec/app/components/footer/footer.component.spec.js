"use strict";

describe("component test", function () {

    beforeEach(module("FoodOrderingApp"));

    describe("footer component", function () {

        var $componentController;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));

        it("should test on footer component", function () {

            expect($componentController).toBeDefined();

        });

    });

});