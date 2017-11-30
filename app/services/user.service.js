(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("UserService", UserService);

    UserService.$inject = ["$sessionStorage"];

    function UserService($sessionStorage) {

        var userList = [];

        // var users = [
        //     {username: "rowanfa", password: "rowanfa@123", role: "admin"},
        //     {username: "aayushfa", password: "aayushfa@123", role: "nUser"},
        //     {username: "nikeshfa", password: "nikeshfa@123", role: "nUser"},
        //     {username: "prameshfa", password: "prameshfa@123", role: "nUser"},
        //     {username: "pratikfa", password: "pratikfa@123", role: "nUser"},
        //     {username: "umeshfa", password: "umeshfa@123", role: "nUser"},
        //     {username: "arjunfa", password: "arjunfa@123", role: "nUser"},
        //     {username: "subashfa", password: "subashfa@123", role: "nUser"},
        //     {username: "kailashfa", password: "kailashfa@123", role: "nUser"},
        //     {username: "shishirfa", password: "shishirfa@123", role: "nUser"},
        //     {username: "ranjanafa", password: "ranjanafa@123", role: "nUser"},
        //     {username: "bikashfa", password: "bikashfa@123", role: "nUser"},
        //     {username: "pradipfa", password: "pradipfa@123", role: "nUser"}
        // ];

        return {
            setUser: function (user) {
                if (user.emailId.toLowerCase() === "rowansiwakoti@gmail.com") {
                    user.role = "admin";
                    $sessionStorage.role = "admin";
                }
                else {
                    user.role = "nUser";
                    $sessionStorage.role = "nUser";
                }
                userList.push(user);
            },
            validateUser: function (loggedInUser) {
                return userList.filter(function (user) {
                    return user.emailId === loggedInUser.emailId && user.password === loggedInUser.password;
                });
            },
            getUserList: function () {
                return userList;
            }
        }

    };
})();