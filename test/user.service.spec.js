describe('userService', function () {

    beforeEach(module('app'));

    var userService, $http, $q, $httpBackend;
    var exampleData = {
        firstName: 'Abc',
        lastName: 'Lincoln'
    };
    var serverUrl = 'http://54.202.243.31:9001';

    beforeEach(inject(function (_userService_, _$http_, _$q_, _$httpBackend_) {
        userService = _userService_;
        $http = _$http_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        
    }));

    describe('createUser function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPOST(serverUrl + '/users').respond(200, exampleData);
            userService.createUser(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });
});