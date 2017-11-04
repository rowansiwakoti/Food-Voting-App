(function () {

    "use strict";

    angular.module("foodVotingApp")
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state("login", {
                name: "login",
                url: "/login",
                templateUrl: "components/login/login.html",
                controller: "LoginController as login"
            })
            .state("dashboard", {
                name: "dashboard",
                url: "/dashboard",
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController as dashboard"
            })

    };

})();