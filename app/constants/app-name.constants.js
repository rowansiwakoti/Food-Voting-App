(function () {
    "use strict";

    var VALUES = {
        APP_NAME: "Food Voting App",
        PAGE_NAME: "User Login",
        INCORRECT_USER_PASSWORD: "Incorrect Username Or Password."
    };
    angular.module("FoodVotingApp")
        .constant("APP", VALUES);
})();
