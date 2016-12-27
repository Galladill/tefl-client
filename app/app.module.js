(function() {
    var app = angular.module('app', []);
    
    app.config(['$locationProvider', function($locationProvider) {
        console.log($locationProvider);
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }]);
   
})();