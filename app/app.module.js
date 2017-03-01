(function () {
    var app = angular.module('app', ['ngStorage', 'ngMaterial', 'login', 'lesson', 'home']);

    app.config(['$httpProvider', '$routeProvider', '$mdThemingProvider', '$mdIconProvider', function ($httpProvider, $routeProvider, $mdThemingProvider, $mdIconProvider) {
        $httpProvider.interceptors.push(function () {
            var SERVER = 'http://localhost:9001';
            return {
                'request': function (config) {
                    if (config.url.indexOf('.html') === -1) {
                        // If this is a request to our api, attach the correct server address and auth token
                        config.url = SERVER + config.url;
                        if (window.localStorage['ngStorage-tefl']) {
                            var accessToken = JSON.parse(window.localStorage['ngStorage-tefl']).accessToken;
                            var userId = JSON.parse(window.localStorage['ngStorage-tefl'])._id;
                            if (accessToken != null) {
                                config.headers['Authorization'] = 'Bearer ' + accessToken;
                                config.headers['user_id'] = userId;
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

        // Configure theme
        $mdThemingProvider.alwaysWatchTheme(true);
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

    }]);
})(); 
