(function() {
    var app = angular.module('app', ['ngMaterial', 'login']);
    
    app.config(['$locationProvider', function($locationProvider) {
        // $locationProvider.html5Mode(true);
    }]);
   
})();