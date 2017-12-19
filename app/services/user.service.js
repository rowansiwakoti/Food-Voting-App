(function () {

    "use strict";

    angular.module("FoodVotingApp")

        .factory("UserService", UserService);

    UserService.$inject = ["$sessionStorage",'$http'];

    function UserService($sessionStorage,$http) {

        return {
            setUser: function (user) {console.log(user,'add this user')
              var req = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                data:user,
                url:'http://localhost:8080/user'
              };

                return($http(req));
            },
            validateUser: function (user) {
                var req = {
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    data:user,
                    url:'http://localhost:8080/user/verify'
                };

                return($http(req));
                /*return userList.filter(function (user) {
                    return user.emailId === loggedInUser.emailId && user.password === loggedInUser.password;
                });*/

            },
            getuserList: function () {
                return userList;
            }
        };

    }
})();