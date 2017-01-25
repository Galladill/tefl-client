(function () {
    'use strict';
    angular.module('app')
    .service('userServiceMock', ['$q', function ($q) {

        // Stub functions here
        this.createUser = jasmine.createSpy('createUser').and.returnValue($q.when({}));
    }]);
}());