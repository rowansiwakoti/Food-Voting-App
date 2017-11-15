
    "use strict";

    describe("controller", function(){

        beforeEach(module("FoodVotingApp"));

        describe("dashboard controller", function(){

            var $scope;

            beforeEach(inject(function($rootScope, $controller){

                $scope = $rootScope.$new();

                $controller("DashboardController as dashboard", {
                   $scope: $scope
                });


            }));

            it("should test page header", function(){
               expect($scope.dashboard.appName).toBe("Food Voting App");
            });

        });

    });

