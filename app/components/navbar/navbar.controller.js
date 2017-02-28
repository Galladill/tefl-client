(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['authService', '$location'];

    function NavbarController(authService, $location) {
        // Attach functions to the controller here.
        var vm = this;
        vm.logout = _logout;

        // Define functions here.
        function _logout() {
            AuthService.logout().then(function(res, err) {
                $location.path('/');
            });
        }
    }

})();