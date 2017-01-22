(function () {
    'use strict';
    angular.module('app')
        .service('userService', ['$http', '$q', function ($http, $q) {

            this.createUser = function (user) {
                console.log(user);
                var q = $q.defer();
                $http.post('/users', user)
                    .success(function (data) {
                        console.log(data);
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };
        }]);
} ());