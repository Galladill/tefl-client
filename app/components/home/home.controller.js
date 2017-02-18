(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$localStorage'];

    function HomeController($localStorage) {
        // Attach functions to the controller here.
        var vm = this;

        // Any logic that needs to run when the controller loads should be placed here.
        vm.sorts = [
            "Last Created",
            "First Created",
            "Last Modified",
            "Name"
        ];

        vm.name = $localStorage.tefl.firstName;
        // Remove later
        console.log($localStorage.tefl);

        // 



        // Define functions here.

    }
})();