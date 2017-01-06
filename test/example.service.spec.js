describe('exampleService', function () {

    beforeEach(module('app'));

    var dataService, $http, $q, $httpBackend;
    var exampleData = {
        firstName: 'Abc',
        lastName: 'Lincoln'
    };

    beforeEach(inject(function (_dataService_, _$http_, _$q_, _$httpBackend_) {
        dataService = _dataService_;
        $http = _$http_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    describe('getData function', function () {
        it('should get some data', function () {
            $httpBackend.whenGET('abc').respond(200, exampleData);
            dataService.getData('abc').then(function (res) {
                expect(res).toEqual(exampleData);
            });
            $httpBackend.flush();
        });
    });
});