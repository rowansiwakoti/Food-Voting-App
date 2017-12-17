(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("UserService", UserService);

    UserService.$inject = ["$sessionStorage",'$http'];

    function UserService($sessionStorage,$http) {

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
            setUser: function (user) {console.log(user,'add this user')
              var req = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                data:user,
                url:'http://localhost:8080/User'
              }
                return($http(req));
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