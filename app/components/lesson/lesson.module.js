(function() {
    var lessonModule = angular.module('lesson', ['ngRoute', 'as.sortable']);
    lessonModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/lesson/:id', {
            templateUrl: 'app/components/lesson/lesson.html',
            controller: 'LessonController',
            controllerAs: 'Lesson'
        });
    }]); 
})();