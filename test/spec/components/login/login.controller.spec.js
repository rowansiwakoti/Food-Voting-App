"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("login controller", function () {

        var $controller, $scope, UserService, $state, $sessionStorage, APP_CONSTANT;

        beforeEach(inject(function (_$rootScope_, _$controller_, _UserService_, _$state_, _$sessionStorage_, _APP_CONSTANT_) {

            $scope = _$rootScope_.$new();
            UserService = _UserService_;
            $state = _$state_;
            $sessionStorage = _$sessionStorage_;
            APP_CONSTANT = _APP_CONSTANT_;

            $controller = _$controller_("LoginController as loginCtrl", {
                $scope: $scope,
                UserService: UserService,
                $state: $state,
                $sessionStorage: $sessionStorage,
                APP_CONSTANT: APP_CONSTANT
            });
        }));
        it("should test on user login page", function () {
            var name = "User Login";

            // expect($state.current.name).toBe("login");
            // expect(loginCtrl.pageName).toBe(name);
        });
    });

});
