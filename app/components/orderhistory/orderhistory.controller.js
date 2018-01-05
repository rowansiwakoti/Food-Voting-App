(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('OrderHistoryController', OrderHistoryController);

    OrderHistoryController.$inject = ['$sessionStorage', '$state'];

    function OrderHistoryController($sessionStorage, $state) {

        var vm = this;

        var middleName = $sessionStorage.middleName || '';

        vm.fullName = $sessionStorage.firstName + ' ' + middleName + ' ' + $sessionStorage.lastName;
        vm.address = $sessionStorage.address;
        vm.contact = $sessionStorage.contact;
        vm.todayDate = new Date();

        vm.items = $sessionStorage.orderList;
        vm.total = 0;

        init()
        function init(){
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }

            if (vm.items) {
                vm.items.forEach(function (item) {
                    vm.total += item.price * item.quantity;
                });
            }
        }

        $sessionStorage.orderList = [];

        vm.printBillReceipt = function (printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWindow = window.open('', '_blank', 'width=600,height=700');
            popupWindow.document.open();
            popupWindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/style.css">\n' +
                '    <link rel="stylesheet" type="text/css" href="assets/libs/bootstrap/bootstrap.min.css"></head><body onload="window.print()">' + innerContents + '</body></html>');
            popupWindow.document.close();
        };
    }

})();