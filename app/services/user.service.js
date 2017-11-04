(function () {

    "use strict";

    angular.module("foodVotingApp")

        .factory("commonService", commonService);

    function commonService() {
        var user = "";

        return {
            setUserName: function (userName) {
                user = userName;
            },
            getUserName: function () {
                return user;
            }
        }

    };
})();