"use strict";

describe("service test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("user service", function () {

        var _userService;

        beforeEach(inject(function (UserService) {
            _userService = UserService;
        }));

        it("should test on user service", function () {

            expect(_userService).not.toEqual(null);

        });

    });
});