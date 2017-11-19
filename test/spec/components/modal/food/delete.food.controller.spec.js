"use strict";

describe("controller", function(){

    beforeEach(module("FoodVotingApp"));

    describe("delete food controller", function(){

        var $scope;

        beforeEach(inject(function($rootScope, $controller){
            $scope = $rootScope.$new();

            $controller("DeleteFoodController as deleteFoodCtrl", {

                $scope: $scope

            });

        }));

        it("should test on delete food controller", function(){

            expect(true).toBe(true);

        });

    });

});