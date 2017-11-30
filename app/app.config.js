(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state("login", {
                name: "login",
                url: "/login",
                templateUrl: "components/login/login.html",
                controller: "LoginController as loginCtrl"
            })
            .state("dashboard", {
                name: "dashboard",
                url: "/dashboard",
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController as dashboardCtrl"
            })
            .state("restaurant",{
                name:"restaurant",
                url:"/restaurant",
                templateUrl:"components/restaurant/restaurant.html",
                controller:"RestaurantCtrl as restaurant",
                params:{
                    restaurant:''
                }
            })
            .state("order",{
                name:'order',
                url:'/order',
                templateUrl:"components/order/order.html",
                controller:'OrderCtrl as order'
            })
            .state("orderhistory",{
                name:'orderhistory',
                url:'/orderhistory',
                templateUrl:"components/orderhistory/orderhistory.html"
            });;
    };
})();