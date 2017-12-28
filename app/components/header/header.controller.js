(function () {
    "use strict";
    angular.module("FoodVotingApp")
        .controller("HeaderController", HeaderController);
    HeaderController.$inject = ["$scope", "APP_CONSTANT", "$sessionStorage", "$state", "OrderService", "$uibModal"];

    function HeaderController($scope, APP_CONSTANT, $sessionStorage, $state, OrderService, $uibModal) {

        var vm = this;

        var appName = APP_CONSTANT.APP_NAME;


        $scope.$on("instantUpdateRole", function(event, data){
                $sessionStorage.role = data;
                vm.role = $sessionStorage.role;
                console.log(vm.role);
        });

        $scope.$on("clearRole", function(event , data){
            vm.role = data;
        });

        vm.order = OrderService.getOrder();
        $scope.$on("updateOrders", function (event, data) {
            vm.order = data;
        });

        vm.getAppName = function () {
            return appName;
        };

        vm.openCart = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/order/order-cart.html",
                controller: "OrderModalController",
                controllerAs: "orderModalCtrl",
                size: "lg"
            });

            modalInstance.result.then(function () {

            }, function () {

            });
        };
    }
})();