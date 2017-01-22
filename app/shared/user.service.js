(function () {
    'use strict';
    angular.module('app')
        .service('userService', ['$http', '$q', function ($http, $q) {

            this.createUser = function (user) {
                var q = $q.defer();
                $http.post('/users', user)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };
        }]);
} ());