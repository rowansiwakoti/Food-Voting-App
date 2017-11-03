angular.module("foodVotingApp", [])

    .controller("LoginController", LoginController);

function LoginController() {
    var vm = this;
    vm.appName = "Food Voting App";

    vm.user = {
        username: "",
        password: ""
    };

};