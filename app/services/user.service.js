(function () {

    'use strict';

    angular.module('FoodOrderingApp')

        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {

        return {
            setUser: function (user) {
                user.balance = 1200;
                var req = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                    url: 'http://localhost:8080/user'
                };

                return ($http(req));
            },
            validateUser: function (user) {
                var req = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                    url: 'http://localhost:8080/user/verify'
                };

                return ($http(req));
            }
        };

    }
})();