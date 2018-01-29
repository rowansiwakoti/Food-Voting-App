(function () {

    'use strict';

    angular.module('FoodOrderingApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        '$state',
        '$uibModal',
        '$sessionStorage',
        '$log',
        'APP_CONSTANT',
        'RestaurantService'
    ];

    function DashboardController($state, $uibModal, $sessionStorage, $log, APP_CONSTANT, RestaurantService) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.restaurants = [];
        vm.message = '';
        vm.firstName = $sessionStorage.firstName;
        vm.role = $sessionStorage.role;

        vm.userLogout = userLogout;
        vm.addRestaurant = addRestaurant;
        vm.deleteRestaurant = deleteRestaurant;
        vm.editRestaurant = editRestaurant;
        vm.placeOrder = placeOrder;


        init();

        function init() {

            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }
            RestaurantService.getRestaurantList().then(
                function (answer) {
                    vm.restaurants = answer.data;
                },
                function (error) {
                    $log.info(error);
                }
            );
        }


        function userLogout() {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/logout/logout.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl',
                size: 'sm'
            });
            modalInstance.result.then(function () {
                vm.message = RestaurantService.getAlertMessage();
            }, function () {
                $log.info('User Logout modal dismissed on ' + new Date());
            });
        }

        function addRestaurant() {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/restaurant/restaurant.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                resolve: {
                    Restaurant: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(function (restaurant) {
                vm.message = RestaurantService.getAlertMessage();
                add(restaurant);
            }, function () {
                $log.info('Add restaurant modal dismissed on ' + new Date());
            });
        }

        function add(restaurant) {
            vm.restaurants.push(restaurant);
        }

        function deleteRestaurant(restaurant) {

            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/restaurant/restaurant-delete-confirm-modal.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                size: 'sm',
                resolve: {
                    Restaurant: function () {
                        return restaurant;
                    }
                }
            });

            modalInstance.result.then(function (id) {
                vm.message = RestaurantService.getAlertMessage();
                deleteRest(id);
            }, function () {
                $log.info('Delete restaurant modal dismissed on ' + new Date());
            });
        }

        function deleteRest(id) {
            var pos;
            vm.restaurants.forEach(function (restro, index) {
                if (restro.id === id) {
                    pos = index;
                }
            });
            vm.restaurants.splice(pos, 1);
        }

        function editRestaurant(restaurant) {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/restaurant/restaurant.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                resolve: {
                    Restaurant: function () {
                        return restaurant;
                    }
                }
            });

            modalInstance.result.then(function (restaurant) {
                vm.message = RestaurantService.getAlertMessage();
                edit(restaurant);
            }, function () {
                $log.info('Edit restaurant modal dismissed on ' + new Date());
            });
        }

        function edit(restaurant) {
            var pos;
            vm.restaurants.forEach(function (restro, index) {
                if (restro.id === restaurant.id) {
                    pos = index;
                }
            });
            vm.restaurants[pos] = restaurant;
        }

        function placeOrder() {
            $state.go('order');
        }
    }

})();
