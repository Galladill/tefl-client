(function() {
    var app = angular.module('tefl', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            // .when('/', {
            //     templateUrl: 'views/main.html',
            //     controller: 'MainCtrl',
            //     controllerAs: 'Main'
            // })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();