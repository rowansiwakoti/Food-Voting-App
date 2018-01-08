(function () {

    'use strict';

    angular.module('FoodOrderingApp')

        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'APP_CONSTANT'];

    function UserService($http, APP_CONSTANT) {

        var appUrl = APP_CONSTANT.FOA_APP;

        return {
            setUser: function (user) {
                user.balance = 1200;
                var req = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                    url: appUrl + '/user'
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
                    url: appUrl + '/user/verify'
                };

                return ($http(req));
            },

            getUsers: function () {
                return ($http.get(appUrl + '/user'));
            }
        };

    }
})();