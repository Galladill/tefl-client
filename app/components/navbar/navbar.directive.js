(function () {
    'use strict';

    angular
        .module('app')
        .directive('navbar', navbar);

    /* @ngInject */
    function navbar() {
        return {
            templateUrl: 'app/components/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'Navbar'
        };
    }

})();
