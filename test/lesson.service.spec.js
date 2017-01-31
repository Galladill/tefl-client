describe('lessonService', function () {

    beforeEach(module('app'));

    var lessonService, $http, $q, $httpBackend;
    var exampleData = {
        firstName: 'Abc',
        lastName: 'Lincoln',
        _id: 'abc123'
    };
    var serverUrl = 'http://54.202.243.31:9001';

    beforeEach(inject(function (_lessonService_, _$http_, _$q_, _$httpBackend_) {
        lessonService = _lessonService_;
        $http = _$http_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        
    }));

    describe('createLesson function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPOST(serverUrl + '/lesson').respond(200, exampleData);
            lessonService.createLesson(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('getLessons function', function () {
        it('should return data on success', function () {
            $httpBackend.whenGET(serverUrl + '/lesson').respond(200, [exampleData]);
            lessonService.getLessons().then(function (res) {
                expect(res).toEqual([exampleData]);
            });
            $httpBackend.flush();
        });
    });

    describe('getLesson function', function () {
        it('should return data on success', function () {
            $httpBackend.whenGET(serverUrl + '/lesson/abc123').respond(200, exampleData);
            lessonService.getLesson(exampleData._id).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('updateLesson function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPUT(serverUrl + '/lesson/abc123').respond(200, exampleData);
            lessonService.updateLesson(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('deleteLesson function', function () {
        it('should return data on success', function () {
            $httpBackend.whenDELETE(serverUrl + '/lesson/abc123').respond(200, exampleData);
            lessonService.deleteLesson(exampleData._id).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });
});