(
    function () {
        'use strict';
        angular.module('FoodVotingApp')
            .controller('FoodAddConfirmController' , FoodAddConfirmController);
        FoodAddConfirmController.$inject = ['foods','$uibModalInstance','FoodService'];

        function FoodAddConfirmController(foods,$uibModalInstance,FoodService) {
            var vm = this;

            vm.addFoodConfirm = function(){
                console.log('m here',foods);
                var add = FoodService.addFoods(foods);
                add.then(
                    function (answer) {
                        $uibModalInstance.close(answer.data);
                    },
                    function (error) {

                    },
                    function (progress) {

                    }
                );

            };
            vm.addFoodDismiss = function () {
                $uibModalInstance.dismiss();
            }

        }
    }
)();