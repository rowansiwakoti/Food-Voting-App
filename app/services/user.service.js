(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("UserService", UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {

        return {
            setUser: function (user) {
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