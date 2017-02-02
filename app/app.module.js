(function () {
    var app = angular.module('app', ['ngStorage', 'ngMaterial', 'login', 'lesson']);

    app.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push(function () {
            var SERVER = 'http://54.202.243.31:9001';
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
                                config.headers['user_id'] = 'Bearer ' + accessToken;
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
    }]);
})();
