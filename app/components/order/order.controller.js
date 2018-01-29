(function (){
    'use strict';

    angular.module("FoodOrderingApp").controller("OrderController", OrderController);

    OrderController.$inject = ['$stateParams'];

    function OrderController($stateParams){
        console.log($stateParams);
    }


})();