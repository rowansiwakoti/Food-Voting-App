(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("CommonService", CommonService);

    function CommonService() {

        var users = [
            {username: "rowanfa", password: "rowanfa@123", role: "admin"},
            {username: "aayushfa", password: "aayushfa@123", role: "nUser"},
            {username: "nikeshfa", password: "nikeshfa@123", role: "nUser"},
            {username: "prameshfa", password: "prameshfa@123", role: "nUser"},
            {username: "pratikfa", password: "pratikfa@123", role: "nUser"},
            {username: "umeshfa", password: "umeshfa@123", role: "nUser"},
            {username: "arjunfa", password: "arjunfa@123", role: "nUser"},
            {username: "subashfa", password: "subashfa@123", role: "nUser"},
            {username: "kailashfa", password: "kailashfa@123", role: "nUser"},
            {username: "shishirfa", password: "shishirfa@123", role: "nUser"},
            {username: "ranjanafa", password: "ranjanafa@123", role: "nUser"},
            {username: "bikashfa", password: "bikashfa@123", role: "nUser"},
        ];

        return {
            validateUser: function (loggedInUser) {
                return users.filter(function (user) {
                    return user.username === loggedInUser.username && user.password === loggedInUser.password;
                });
            }
        }

    };
})();