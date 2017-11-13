(function () {

    "use strict";

    angular.module("foodVotingApp")

        .factory("commonService", commonService);

    function commonService() {
        var vm = this;

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
            // setUser: function (userName) {
            //     user = userName;
            // },
            getUsers: function () {
                return users;
            },
            validateUser: function (loggedInUser) {
                return users.filter(function (user) {
                    return user.username === loggedInUser.username && user.password === loggedInUser.password;
                });
            }
        }

    };
})();