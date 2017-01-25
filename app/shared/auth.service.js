(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$http', '$q', '$localStorage', '$rootScope', '$location', '$route', 'authConfig'];
    function authService($http, $q, $localStorage, $rootScope, $location, $route, authConfig) {
        var service = this;
        activate();
        function activate() {
            $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute) {
                if (currentRoute.$$route) {
                    if (authConfig.privateRoutes.indexOf(currentRoute.$$route.originalPath) >= 0) {
                        // If this route is part of the private routes list and accessToken is expired, then attempt a refresh
                        var now = Date.now();
                        var expiresAt;
                        if ($localStorage.tefl) {
                            expiresAt = $localStorage.tefl.accessTokenExpires * 1000;
                            if (expiresAt < now) {
                                event.preventDefault();
                                service.refresh().then(
                                    function (data) {
                                        // You're still authorized, continue to the page.
                                        $route.reload();
                                    },
                                    function (data) {
                                        // You're not authorized, redirect
                                        delete $localStorage.tefl;
                                        $location.path(authConfig.redirectRoute);
                                    }
                                );
                            } else {
                                // accessToken not expired, no refresh required.
                            }
                        } else {
                            // You don't have token information, redirect
                            $location.path(authConfig.redirectRoute);
                        }
                    }
                }
            });
        }

        this.login = function(email, password) {
            var url = '/login';
            var params = {
                email: email,
                password: password
            };
            var q = $q.defer();
            var user;
            $http.post(url, params).
                success(function (data) {
                    user = data;
                    $localStorage.tefl = data;
                    q.resolve(user);
                }).
                error(function (data, status) {
                    q.reject('Error, unable to login at this time.');
                });
            return q.promise;
        }

        this.logout = function() {
            var url = authConfig.authUrl + 'logout';
            var q = $q.defer();
            $http.post(url, {}).
                success(function (data) {
                    delete $localStorage.tefl;
                    service.allowedRoutes = routePermissions({});
                    var currentPath = $route.current.$$route.originalPath;
                    if (service.allowedRoutes.public.indexOf(currentPath) === -1) {
                        $location.path(authConfig.redirectRoute);
                    }
                    q.resolve(data);
                }).
                error(function (data, status) {
                    q.reject('Error, unable to logout at this time.');
                });
            return q.promise;
        }

        this.refresh = function() {
            var q = $q.defer();
            if ($localStorage.tefl && $localStorage.tefl.accessToken) {
                var url = authConfig.authUrl + 'refresh';
                var params = {
                    refreshToken: $localStorage.tefl.refreshToken
                };
                $http.post(url, params).
                    success(function (data) {
                        $localStorage.tefl = data;
                        q.resolve(data);
                    }).
                    error(function (data, status) {
                        q.reject('Error, unable to refresh at this time.');
                    });
            } else {
                q.reject('No access token!');
            }
            return q.promise;
        }

        /* 
        ** Check to see if the refreshToken is expired (client-side)
        ** Can be used for ng-if statements, and other front-end logic
        */
        this.getLoginStatus = function() {
            var now = Date.now();
            var expiresAt;
            if ($localStorage.tefl) {
                expiresAt = $localStorage.tefl.refreshTokenExpires * 1000;
                if (expiresAt > now) {
                    return true;
                }
            }
            return false;
        }

        this.getAccessToken = function() {
            var accessToken;
            if ($localStorage.tefl) {
                accessToken = $localStorage.tefl.accessToken;
            }
            return accessToken;
        }
    }
} ());