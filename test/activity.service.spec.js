describe('activityService', function () {

    beforeEach(module('app'));

    var activityService, $http, $q, $httpBackend;
    var exampleData = {
        firstName: 'Abc',
        lastName: 'Lincoln',
        _id: 'abc123'
    };
    var serverUrl = 'http://54.202.243.31:9001';

    beforeEach(inject(function (_activityService_, _$http_, _$q_, _$httpBackend_) {
        activityService = _activityService_;
        $http = _$http_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        
    }));

    describe('createActivity function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPOST(serverUrl + '/activity').respond(200, exampleData);
            activityService.createActivity(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('getActivities function', function () {
        it('should return data on success', function () {
            $httpBackend.whenGET(serverUrl + '/activity').respond(200, [exampleData]);
            activityService.getActivities().then(function (res) {
                expect(res).toEqual([exampleData]);
            });
            $httpBackend.flush();
        });
    });

    describe('getActivity function', function () {
        it('should return data on success', function () {
            $httpBackend.whenGET(serverUrl + '/activity/abc123').respond(200, exampleData);
            activityService.getActivity(exampleData._id).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('updateActivity function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPUT(serverUrl + '/activity/abc123').respond(200, exampleData);
            activityService.updateActivity(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });

    describe('deleteActivity function', function () {
        it('should return data on success', function () {
            $httpBackend.whenDELETE(serverUrl + '/activity/abc123').respond(200, exampleData);
            activityService.deleteActivity(exampleData._id).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });
});