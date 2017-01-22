(function () {
    'use strict';

    var authConfig = {
        // The route to redirect to when logging out, or trying to go to a non-authorized path
        'redirectRoute': '/login',

        // All routes that require the user to be logged in
        'privateRoutes': ['/example'],

        // All routes that exist in the app but do not require user authentication
        'publicRoutes': ['/login']
    };

    angular
        .module('app')
        .constant('authConfig', authConfig);
})();