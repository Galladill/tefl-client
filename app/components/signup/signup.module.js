(function() {
    var signupModule = angular.module('signup', ['ngRoute']);
    
    signupModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl : './signup.html',
            controller : 'SignupController',
            controllerAs: 'Signup'
        });
    }]); 
})();