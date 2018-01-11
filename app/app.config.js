(function () {

    "use strict";

    angular.module('FoodOrderingApp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
                templateUrl: 'components/order-lists/order.lists.html',
                controller: 'OrderListController as orderCtrl'
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
            .state('gotologin',{
                url:'/gotologin',
                templateUrl:'components/goto-login/goto.login.html',
                controller:'GotoLoginController as gotoCtrl'
            });

    }
})();