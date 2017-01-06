(function () {
    'use strict';
    angular.module('app')
        .service('exampleService', ['$http', '$q', function ($http, $q) {

            this.getData = function (id) {
                var q = $q.defer();
                // $http.get(url)
                //     .success(function (data) {
                //         q.resolve(data);
                //     })
                //     .error(function (data, status) {
                //         q.reject('Error');
                //     });
                return q.promise;
            };
        }]);
} ());