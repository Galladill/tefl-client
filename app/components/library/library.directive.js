(function () {
    'use strict';

    angular
        .module('app')
        .directive('library', library);

    /* @ngInject */
    function library() {
        return {
            // scope: {
            //     activities: '=',
            // },
            templateUrl: 'app/components/library/library.html',
            controller: 'LibraryController',
            controllerAs: 'Library'
        };
    }
})();