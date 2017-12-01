(function () {
    "use strict";

    var VALUES = {
        APP_NAME: "Food Voting App",
        PAGE_NAME: "User Login",
        USER_INPUT_LENGTH: "Username must be of 6-10 characters.",
        USER_INPUT_FORMAT: "Username must be alpha numeric.",
        INCORRECT_USER_PASSWORD: "Incorrect Username Or Password.",
        ADD_MSG: "has been added.",
        EDIT_MSG: "has been edited.",
        DELETE_MSG: "has been deleted.",
        LOGOUT_MSG: "Are you sure want to log out?",
        RES_NAME_REQ_MSG: "Restaurant name is required.",
        CONTACT_NO_MSG: "Contact number should be 10 characters only.",
        NUMBERS_ONLY_MSG: "Accepts numbers only.",
        FOOD_NAME_REQ_MSG: "Food name is required.",
        FOOD_PRICE_REQ_MSG: "Food price is required.",
        DELETE_FOOD_MSG: "Are you sure want to delete the food?",
        NO_FOOD_MSG: "No Food Added.",
        FIRST_NAME_MSG: "First name is required.",
        LAST_NAME_MSG: "Last name is required.",
        EMAIL_MSG: "Email Id is required.",
        INVALID_EMAIL_MSG: "Invalid email address.",
        CONTACT_NUM_MSG: "Contact number is required.",
        ADDRESS_MSG: "Address is required.",
        PASSWORD_MSG: "Password is required.",
        CONFIRM_PASSWORD_MSG: "Confirm password is required."

    };
    angular.module("FoodVotingApp")
        .constant("APP_CONSTANT", VALUES);
})();
