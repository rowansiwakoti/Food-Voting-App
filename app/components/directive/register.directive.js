(
    function () {
        'use strict';
        angular.module('FoodVotingApp')
            .directive('registerDirective',registerDirective)
        function registerDirective() {
            return {
              restrict:'E',
                templateUrl:'components/directive/register.directive.html',
                controller:'RegisterController as registerCtrl'
            };
        }
    }
)();