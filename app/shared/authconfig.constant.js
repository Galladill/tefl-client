(function () {
    'use strict';

    var authConfig = {
        // The route to redirect to when logging out, or trying to go to a non-authorized path
        'redirectRoute': '/login',

        // All routes that require the user to be logged in
        'privateRoutes': ['/example'],
    };

    angular
        .module('app')
        .constant('authConfig', authConfig);
})();