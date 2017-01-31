(function () {
    'use strict';
    angular.module('app')
    .service('lessonServiceMock', ['$q', function ($q) {

        // Stub functions here
        this.createLesson = jasmine.createSpy('createLesson').and.returnValue($q.when({}));
        this.getLessons = jasmine.createSpy('getLessons').and.returnValue($q.when({}));
        this.getLesson = jasmine.createSpy('getLesson').and.returnValue($q.when({}));
        this.updateLesson = jasmine.createSpy('updateLesson').and.returnValue($q.when({}));
        this.deleteLesson = jasmine.createSpy('deleteLesson').and.returnValue($q.when({}));
    }]);
}());