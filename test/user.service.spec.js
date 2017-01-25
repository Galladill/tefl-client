describe('userService', function () {

    beforeEach(module('app'));

    var userService, $http, $q, $httpBackend;
    var exampleData = {
        firstName: 'Abc',
        lastName: 'Lincoln'
    };

    beforeEach(inject(function (_userService_, _$http_, _$q_, _$httpBackend_) {
        dataService = _userService_;
        $http = _$http_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    describe('createUser function', function () {
        it('should return data on success', function () {
            $httpBackend.whenPOST('/users').respond(200, exampleData);
            userService.createUser(exampleData).then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });
});