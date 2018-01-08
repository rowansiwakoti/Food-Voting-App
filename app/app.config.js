(function () {

    'use strict';

    angular.module('FoodOrderingApp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginController as loginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'components/dashboard/dashboard.html',
                controller: 'DashboardController as dashboardCtrl'
            })
            .state('restaurant', {
                url: '/restaurant',
                templateUrl: 'components/restaurant/restaurant.html',
                controller: 'RestaurantController as restaurantCtrl',
                params: {
                    restaurant: ''
                }
            })
            .state('order', {
                url: '/order',
                templateUrl: 'components/order/order.html',
                controller: 'OrderController as orderCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'components/register/register.html',
                controller: 'RegisterController as registerCtrl'
            })
            .state('orderhistory', {
                url: '/orderhistory',
                templateUrl: 'components/orderhistory/orderhistory.html',
                controller: 'OrderHistoryController as orderHistoryCtrl'
            })
            .state('gotologin', {
                url: '/gotologin',
                templateUrl: 'components/goto-login/goto.login.html',
                controller: 'GotoLoginController as gotoCtrl'
            });
    }
})();