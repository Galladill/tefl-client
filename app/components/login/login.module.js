(function() {
    var loginModule = angular.module('login', ['ngRoute']);
    
    loginModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginController',
            controllerAs: 'Login'
        });
    }]); 
})();