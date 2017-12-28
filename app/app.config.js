(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider","$httpProvider"];

    function config($stateProvider, $urlRouterProvider,$httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
                controller:"RestaurantController as restaurantCtrl",
                params:{
                    restaurant:''
                }
            })
            .state("order",{
                name:'order',
                url:'/order',
                templateUrl:"components/order/order.html",
                controller:"OrderController as orderCtrl"
            })
            .state("register", {
                url: "/register",
                templateUrl: "components/register/register.html",
                controller: "RegisterController as registerCtrl"
            })
            .state("orderhistory",{
                name:'orderhistory',
                url:'/orderhistory',
                templateUrl:"components/orderhistory/orderhistory.html",
                controller: "OrderHistoryController as orderCtrl"
            })

    };
})();