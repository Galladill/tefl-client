(function () {
    'use strict';
    angular.module('app')
        .service('activityService', ['$http', '$q', function ($http, $q) {

            this.createActivity = function (activity) {
                var q = $q.defer();
                $http.post('/activity', activity)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            // get all activities (may want to add optional queries at a later point)
            this.getActivities = function () {
                var q = $q.defer();
                $http.get('/activity')
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            // get a single activity
            this.getActivity = function (id) {
                var q = $q.defer();
                $http.get('/activity/' + id)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            this.updateActivity = function (activity) {
                var q = $q.defer();
                $http.put('/activity/' + activity._id, activity)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            this.deleteActivity = function (id) {
                var q = $q.defer();
                $http.delete('/activity/' + id)
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