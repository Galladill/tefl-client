(function () {
    'use strict';
    angular.module('app')
        .service('lessonService', ['$http', '$q', function ($http, $q) {

            this.createLesson = function (lesson) {
                var q = $q.defer();
                $http.post('/lesson', lesson)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            // get all activities (may want to add optional queries at a later point)
            this.getLessons = function () {
                var q = $q.defer();
                $http.get('/lesson')
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            // get a single lesson
            this.getLesson = function (id) {
                var q = $q.defer();
                $http.get('/lesson/' + id)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            this.updateLesson = function (lesson) {
                var q = $q.defer();
                $http.put('/lesson/' + lesson._id, lesson)
                    .success(function (data) {
                        q.resolve(data);
                    })
                    .error(function (data, status) {
                        q.reject('Error');
                    });
                return q.promise;
            };

            this.deleteLesson = function (id) {
                var q = $q.defer();
                $http.delete('/lesson/' + id)
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