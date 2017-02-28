(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$http', '$q', '$localStorage', '$rootScope', '$location', '$route', 'authConfig'];
    function authService($http, $q, $localStorage, $rootScope, $location, $route, authConfig) {
        var service = this;
        var loggedIn, tokenExpired, isPrivateRoute, isLoginPage;

        this.login = function (email, password) {
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
        };

        this.logout = function () {
            var url = '/logout';
            var q = $q.defer();
            $http.post(url, {}).
                success(function (data) {
                    delete $localStorage.tefl;
                    q.resolve(data);
                }).
                error(function (data, status) {
                    q.reject('Error, unable to logout at this time.');
                });
            return q.promise;
        };

        this.refresh = function () {
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
        };
        checkAuth($location.$$path);
        $rootScope.$on('$routeChangeStart', function (event, currentRoute, previousRoute) {
            checkAuth(currentRoute.$$route.originalPath);
        });

        function checkAuth(route) {
            if (route === authConfig.loginRoute) {
                isLoginPage = true;
            } else {
                isLoginPage = false;
            }

            if (authConfig.privateRoutes.indexOf(route) >= 0) {
                isPrivateRoute = true;
            } else {
                isPrivateRoute = false;
            }

            if ($localStorage.tefl) {
                loggedIn = true;
                var now = Date.now();
                var expiresAt = $localStorage.tefl.accessTokenExpires;
                if (expiresAt < now) {
                    tokenExpired = true;
                } else {
                    tokenExpired = false;
                }
            } else {
                loggedIn = false;
                tokenExpired = true;
            }

            if (loggedIn) {
                if (tokenExpired) {
                    event.preventDefault();
                    service.refresh().then(
                        function (data) {
                            // You're still authorized, continue to the page.
                            if (isLoginPage) {
                                // if we're properly logged in already, no need to see login page.
                                $location.path(authConfig.authRedirectRoute);
                            } else {
                                $route.reload();
                            }
                        },
                        function (data) {
                            // You're not authorized, redirect
                            delete $localStorage.tefl;
                            $location.path(authConfig.loginRoute);
                        }
                    );
                } else {
                    if (isLoginPage) {
                        // if we're properly logged in already, no need to see login page.
                        $location.path(authConfig.authRedirectRoute);
                    }
                }
            } else {
                if (isPrivateRoute) {
                    $location.path(authConfig.loginRoute);
                }
            }
        }

        /* 
        ** Check to see if the refreshToken is expired (client-side)
        ** Can be used for ng-if statements, and other front-end logic
        */
        this.getLoginStatus = function () {
            var now = Date.now();
            var expiresAt;
            if ($localStorage.tefl) {
                expiresAt = $localStorage.tefl.refreshTokenExpires * 1000;
                if (expiresAt > now) {
                    return true;
                }
            }
            return false;
        };

        this.getAccessToken = function () {
            var accessToken;
            if ($localStorage.tefl) {
                accessToken = $localStorage.tefl.accessToken;
            }
            return accessToken;
        };
    }
} ());