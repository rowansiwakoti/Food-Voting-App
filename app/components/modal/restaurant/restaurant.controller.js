(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("RestaurantController", RestaurantController);

    RestaurantController.$inject = ["$uibModalInstance", "RestaurantService", "APP_CONSTANT"];

    function RestaurantController($uibModalInstance, RestaurantService, APP_CONSTANT) {
        var vm = this;

        vm.resNameReqMsg = APP_CONSTANT.RES_NAME_REQ_MSG;
        vm.contactNoMsg = APP_CONSTANT.CONTACT_NO_MSG;
        vm.numbersOnlyMsg = APP_CONSTANT.NUMBERS_ONLY_MSG;

        vm.ok = function (restaurant) {

            RestaurantService.setRestaurant(restaurant);
            RestaurantService.setAlertMessage(restaurant.name + " " + APP_CONSTANT.ADD_MSG);
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();