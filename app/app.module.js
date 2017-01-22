(function () {
    var app = angular.module('app', ['ngStorage', 'ngMaterial', 'login']);

    app.config(['$httpProvider', function ($httpProvider) {
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
    }]);
})();
