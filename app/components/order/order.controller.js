(function () {
    "use strict";

    angular.module('FoodVotingApp')
        .controller('OrderCtrl',OrderCtrl);

    OrderCtrl.$inject=['$sessionStorage'];

    function OrderCtrl($sessionStorage) {
        var that=this;
        that.order = $sessionStorage.order;
    }
})();