(function () {

    "use strict";

    angular.module("FoodVotingApp")
        .config(config);

    config.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];

    function config($stateProvider,$locationProvider, $urlRouterProvider) {
        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "components/login/login.html",
                controller: "LoginController as loginCtrl"
            })
            .state("register", {
                url: "/register",
                templateUrl: "components/register/register.html",
                controller: "RegisterController as registerCtrl"
            })
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController as dashboardCtrl"
            });
    };
})();