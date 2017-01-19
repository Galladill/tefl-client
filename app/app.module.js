(function() {
    var app = angular.module('app', ['login']);
    
    app.config(['$locationProvider', function($locationProvider) {
        // $locationProvider.html5Mode(true);
    }]);
   
})();