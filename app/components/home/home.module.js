(function() {
    var homeModule = angular.module('home', ['ngRoute']);
    
    homeModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Home', {
            templateUrl : 'app/components/home/home.html',
            controller : 'HomeController',
            controllerAs: 'Home'
        });
    }]); 
})();