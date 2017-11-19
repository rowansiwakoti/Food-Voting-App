"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("food controller", function(){

        var $scope;

        beforeEach(inject(function($rootScope, $controller){
            $scope = $rootScope.$new();

            $controller("FoodController as foodCtrl", {
                $scope: $scope
            });

        }));

        it("should test on food controller", function(){
            expect(true).toBe(true);
        });

    });

})