(function() {
    var lessonModule = angular.module('lesson', ['ngRoute']);
    console.log('module');
    lessonModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/lesson', {
            templateUrl: 'app/components/lesson/lesson.html',
            controller: 'LessonController',
            controllerAs: 'Lesson'
        });
    }]); 
})();