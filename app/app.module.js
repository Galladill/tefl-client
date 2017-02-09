(function () {
    var app = angular.module('app', ['ngStorage', 'ngMaterial', 'login', 'home']);

    app.config(['$httpProvider', '$routeProvider', '$mdThemingProvider', function ($httpProvider, $routeProvider, $mdThemingProvider) {
        $httpProvider.interceptors.push(function () {
            var SERVER = 'http://localhost:9001';
            return {
                'request': function (config) {
                    if (config.url.indexOf('.html') === -1) {
                        // If this is a request to our api, attach the correct server address and auth token
                        config.url = SERVER + config.url;
                        if (window.localStorage['ngStorage-tefl']) {
                            var accessToken = JSON.parse(window.localStorage['ngStorage-tefl']).accessToken;
                            if (accessToken != null) {
                                config.headers['Authorization'] = 'Bearer ' + accessToken;
                            }
                        }
                    }
                    return config;
                },

                'response': function (response) {
                    return response;
                }
            };
        });

        $routeProvider.otherwise('/');

        $mdThemingProvider.alwaysWatchTheme(true);
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

    }]);
})();
