
    "use strict";

    describe("controller", function(){

        beforeEach(module("FoodVotingApp"));

        describe("dashboard controller", function(){

            var $scope, APP_CONSTANT;

            beforeEach(inject(function($rootScope, $controller, _APP_CONSTANT_){

                $scope = $rootScope.$new();
                APP_CONSTANT = _APP_CONSTANT_;

                $controller("DashboardController as dashboard", {
                   $scope: $scope
                });

            }));

            it("should test page header", function(){
               expect(true).toBe(true);
            });

        });

    });

