(function () {
    'use strict';
    angular.module('app')
    .service('activityServiceMock', ['$q', function ($q) {

        // Stub functions here
        this.createActivity = jasmine.createSpy('createActivity').and.returnValue($q.when({}));
        this.getActivities = jasmine.createSpy('getActivities').and.returnValue($q.when({}));
        this.getActivity = jasmine.createSpy('getActivity').and.returnValue($q.when({}));
        this.updateActivity = jasmine.createSpy('updateActivity').and.returnValue($q.when({}));
        this.deleteActivity = jasmine.createSpy('deleteActivity').and.returnValue($q.when({}));
    }]);
}());