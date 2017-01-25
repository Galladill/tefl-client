(function () {
    'use strict';
    angular.module('app')
    .service('authServiceMock', ['$q', function ($q) {

        // Stub functions here
        this.login = jasmine.createSpy('login').and.returnValue($q.when({}));
        this.logout = jasmine.createSpy('logout').and.returnValue($q.when({}));
        this.refresh = jasmine.createSpy('refresh').and.returnValue($q.when({}));
        this.getAccessToken = jasmine.createSpy('getAccessToken').and.returnValue($q.when({}));
        this.getLoginStatus = jasmine.createSpy('getLoginStatus').and.returnValue($q.when({}));
    }]);
}());