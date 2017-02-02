(function() {
    var lessonModule = angular.module('lesson', ['ngRoute']);
    
    lessonModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'app/components/lesson/lesson.html',
            controller : 'LessonController',
            controllerAs: 'Lesson'
        });
    }]); 
})();