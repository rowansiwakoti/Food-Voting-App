(function () {
    'use strict';

    var VALUES = {
        APP_NAME: 'Food Ordering App',
        PAGE_NAME: 'User Login',
        USER_INPUT_LENGTH: 'Username must be of 6-10 characters.',
        USER_INPUT_FORMAT: 'Username must be alpha numeric.',
        INCORRECT_USER_PASSWORD: 'Incorrect Username Or Password.',
        ADD_MSG: 'has been added.',
        EDIT_MSG: 'has been edited.',
        DELETE_MSG: 'has been deleted.',
        LOGOUT_MSG: 'Are you sure you want to log out?',
        RES_NAME_REQ_MSG: 'Restaurant name is required.',
        CONTACT_NO_MSG: 'Contact number should be 10 characters only.',
        NUMBERS_ONLY_MSG: 'Accepts numbers only.',
        FOOD_NAME_REQ_MSG: 'Food name is required.',
        FOOD_PRICE_REQ_MSG: 'Food price is required.',
        DELETE_FOOD_MSG: 'Are you sure you want to delete the food?',
        NO_FOOD_MSG: 'No Food Added.',
        FIRST_NAME_MSG: 'First Name required',
        LAST_NAME_MSG: 'Last Name required',
        MAX_ORDERS: 5,
        MIN_ORDERS: 1,
        FOA_APP: 'http://localhost:8080'
    };
    angular.module('FoodOrderingApp')
        .constant('APP_CONSTANT', VALUES);
})();