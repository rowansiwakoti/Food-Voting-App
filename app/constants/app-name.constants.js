(function () {
    "use strict";

    var VALUES = {
        APP_NAME: "Food Voting App",
        PAGE_NAME: "User Login",
        INCORRECT_USER_PASSWORD: "Incorrect Username Or Password.",
        ADD_MSG: "has been added.",
        EDIT_MSG: "has been edited.",
        DELETE_MSG: "has been deleted"
    };
    angular.module("FoodVotingApp")
        .constant("APP", VALUES);
})();
