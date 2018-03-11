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
        'RestaurantService',
        'UserService',
        '$rootScope'
    ];

    function DashboardController($state, $uibModal, $sessionStorage, $log, APP_CONSTANT, RestaurantService, UserService, $rootScope) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.restaurants = [];
        vm.message = '';
        vm.firstName = $sessionStorage.firstName;
        vm.role = $sessionStorage.role;
        vm.totalRestaurants = 0;

        vm.userLogout = userLogout;
        vm.addRestaurant = addRestaurant;
        vm.deleteRestaurant = deleteRestaurant;
        vm.editRestaurant = editRestaurant;
        vm.placeOrder = placeOrder;
        vm.selectPage = selectPage;
        vm.getAllUsers = getAllUsers;

        // alert('init function');
        vm.$onInit = function () {
            /*if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }*/

            if ($sessionStorage.currentPage) {
                vm.currentPage = $sessionStorage.currentPage;
                selectPage();
            }
            else {
                vm.currentPage = 1;
                selectPage();
            }
            if($sessionStorage.loggedIn !== 1){
                $sessionStorage.loggedIn = 1;
                $rootScope.$broadcast('loggedIn',{});
            }
        };


        function selectPage() {
            $sessionStorage.currentPage = vm.currentPage;

            RestaurantService.getRestaurantList(vm.currentPage - 1).then(
                function (answer) {
                    vm.currentPage = $sessionStorage.currentPage;
                    // console.log(answer.data);
                    vm.restaurants = answer.data.responseData;
                    vm.totalRestaurants = answer.data.pageModel.count;
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
                // backdrop: false,
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
            if (vm.restaurants.length < 6) {
                vm.restaurants.push(restaurant);
            }
            else if(vm.restaurants.length >= 6){console.log(vm.restaurants.length);
                vm.selectPage();
            }
        }

        function deleteRestaurant(restaurant) {

            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
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
           /* var pos;
            vm.restaurants.forEach(function (restro, index) {
                if (restro.id === id) {
                    pos = index;
                }
            });
            vm.restaurants.splice(pos, 1);*/
           vm.selectPage();
        }

        function editRestaurant(restaurant) {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
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

        function getAllUsers() {
            $state.go('users');
        }

        function placeOrder() {
            $state.go('order');
        }
    }

})();