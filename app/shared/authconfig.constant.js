(function () {
    'use strict';

    var authConfig = {
        // The route to redirect to when logging out, or trying to go to a non-authorized path
        'loginRoute': '/',

        // the route to redirect to for users that are logged in
        'authRedirectRoute': '/home',

        // All routes that require the user to be logged in
        'privateRoutes': ['/home', '/lesson:/:id'],
    };

    angular
        .module('app')
        .constant('authConfig', authConfig);
})();