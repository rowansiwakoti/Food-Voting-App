(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("UserService", UserService);

    UserService.$inject = ["$sessionStorage"];

    function UserService($sessionStorage) {

        var userList = [
            {
                firstName: 'rowan',
                midName: '',
                lastName: 'siwakoti',
                emailId: 'rowansiwakoti@gmail.com',
                contact: 9874654,
                address: 'jhapa',
                role: 'admin',
                password: 'f1soft'
            },
            {
                firstName: 'bikram',
                midName: '',
                lastName: 'limbu',
                emailId: 'bikramlimbu@gmail.com',
                contact: 98784562,
                address: 'jhapa',
                role:'user',
                password: 'f1soft'
            }
        ];


        return {
            setUser: function (user) {
                user.role = 'user';
                userList.push(user);
            },
            validateUser: function (loggedInUser) {
                return userList.filter(function (user) {
                    return user.emailId === loggedInUser.emailId && user.password === loggedInUser.password;
                });
            },
            getuserList: function () {
                return userList;
            }
        };

    }
})();