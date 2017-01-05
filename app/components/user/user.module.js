(function() {
    var userModule = angular.module('user', ['ngRoute']);
    
    userModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl : './user.html',
            controller : 'UserController',
            controllerAs: 'User'
        });
    }]); 
})();